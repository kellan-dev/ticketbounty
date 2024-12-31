import { prisma } from "../prisma";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { cache } from "react";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import type {
  User as DatabaseUser,
  Session as DatabaseSession,
} from "@prisma/client";
import { redirect } from "next/navigation";

// Default shape for authenticated user
export interface AuthUser {
  id: string;
}

// Ensures we're always working with the correct type of user ID, since we can't assume string
type UserId = AuthUser["id"];

// Default shape for authenticated session
export interface AuthSession {
  id: string;
  userId: UserId;
  expiresAt: Date;
}

// Configuration options
interface LuciaConfig {
  session: {
    refreshInterval: number;
    expirationInterval: number;
  };
  sessionCookie: {
    name: string;
    attributes: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      path: string;
    };
  };
  /**
   * Maps a user record from the database to an AuthUser object.
   * @param user The user record from the database.
   * @returns An AuthUser object.
   */
  getAuthUser: (databaseUser: DatabaseUser) => AuthUser;
  /**
   * Maps a session record from the database to an AuthSession object.
   * @param session The session record from the database.
   * @returns An AuthSession object.
   */
  getAuthSession: (databaseSession: DatabaseSession) => AuthSession;
}

export interface LuciaInstance {
  auth: () => Promise<AuthState>;
  authOrRedirect: (
    path: string,
  ) => Promise<{ session: AuthSession; user: AuthUser }>;
  createSession: (userId: UserId) => Promise<void>;
  invalidateSession: () => Promise<void>;
}

// Shape of authentication object returned by auth().
export type AuthState =
  | { session: AuthSession; user: AuthUser }
  | { session: null; user: null };

let _luciaInstance: LuciaInstance | null = null;

export function getLuciaInstance(): LuciaInstance | null {
  return _luciaInstance;
}

/**
 * Factory function to create a new Lucia instance
 * @param luciaConfig Configuration options
 * @returns A new instance of Lucia
 */
export function createLucia(
  luciaConfig: Partial<LuciaConfig> = {},
): LuciaInstance {
  // Sensible defaults to provide an easy user experience; only override what you need
  const defaultConfig: LuciaConfig = {
    sessionCookie: {
      name: "auth_session",
      attributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
    session: {
      refreshInterval: 1000 * 60 * 60 * 24 * 15, // 15 days
      expirationInterval: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    getAuthUser: (user: DatabaseUser) =>
      ({
        id: user.id,
      }) as AuthUser,
    getAuthSession: (session: DatabaseSession) =>
      ({
        id: session.id,
        userId: session.userId,
        expiresAt: session.expiresAt,
      }) as AuthSession,
  };

  // Merge the provided config with the default config
  const config = {
    ...defaultConfig,
    ...luciaConfig,
    sessionCookie: {
      ...defaultConfig.sessionCookie,
      ...luciaConfig.sessionCookie,
      attributes: {
        ...defaultConfig.sessionCookie.attributes,
        ...luciaConfig.sessionCookie?.attributes,
      },
    },
    session: {
      ...defaultConfig.session,
      ...luciaConfig.session,
    },
  };

  const _token = {
    /**
     * Generates a random session token that can be used to authenticate a user.
     * This token is stored by the client in a cookie, and is provided by the client when making requests to the server.
     * The server hashes the provided token and compares it to the hashed token stored in the database.
     * If the tokens match, the user is authenticated.
     * @returns A random session token.
     */
    generate(): string {
      // Create an empty array of 8-bit values, 20 elements in length (160 bits total)
      // Example: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const bytes = new Uint8Array(20);

      // Fill the array with cryptographically secure random values (160 bits of entropy)
      // Example: [183, 47, 199, 8, 214, 39, 92, 143, 126, 5, 118, 27, 162, 89, 45, 12, 200, 155, 77, 33]
      crypto.getRandomValues(bytes);

      // Encode the array as a base32 string (URL-safe, case-insensitive, compact representation, no padding needed)
      // Example: "wl2h7ce2kxm6h73vlgnjmwkzdy"
      const token = encodeBase32LowerCaseNoPadding(bytes);

      return token;
    },

    /**
     * Hashes a session token using SHA-256. The resulting hash is safe to store in the database, as it can't be reverse-engineered to produce the original token.
     * @param token The session token to hash.
     * @returns The hashed token as a hexadecimal string.
     */
    hash(token: string): string {
      // Produce a UTF-8 representation of the token string (consistent across all platforms)
      // Example: [119, 108, 50, 104, 55, 99, 101, 50, 107, 120, 109, 54, 104, 55, 51, 118, 108, 103, 110, 106, 109, 119, 107, 122, 100, 121]
      const tokenBytes = new TextEncoder().encode(token);

      // Hash the UTF-8 representation of the token string with SHA-256 (irreversible, secure)
      // Example: [239, 186, 23, ...] (32 bytes)
      const hash = sha256(tokenBytes);

      // Encode the hash as a lowercase hexadecimal string (perfect format for representing and storing hashes)
      // Example: "efba17..." (64 characters)
      const hashString = encodeHexLowerCase(hash);

      return hashString;
    },
  };

  // Todo: Abstract these functions to use with different database adapters
  const _database = {
    /**
     * Creates a new session record in the database.
     * @param id The session ID.
     * @param userId The user ID associated with the session.
     * @param expiresAt The expiration date of the session.
     * @returns The newly created session record.
     */
    async createSession(
      id: string,
      userId: UserId,
      expiresAt: Date,
    ): Promise<DatabaseSession> {
      return await prisma.session.create({
        data: { id, userId, expiresAt },
      });
    },

    /**
     * Finds a session record in the database by its ID.
     * @param id The ID of the session to find.
     * @returns The session record if found, or null if not found.
     */
    async getSession(
      id: string,
    ): Promise<(DatabaseSession & { user: DatabaseUser }) | null> {
      return await prisma.session.findUnique({
        where: { id },
        include: { user: true },
      });
    },

    /**
     * Updates the expiration date of a session record in the database.
     * @param id The ID of the session record to update.
     * @param expiresAt The new expiration date for the session record.
     */
    async updateSession(id: string, expiresAt: Date) {
      await prisma.session.update({
        where: { id },
        data: { expiresAt },
      });
    },
    /**
     * Deletes a session record from the database as part of the session invalidation process.
     * @param id The ID of the session record to delete.
     */
    async deleteSession(id: string) {
      await prisma.session.delete({ where: { id } });
    },
  };

  const _cookie = {
    /**
     * Sets a session token cookie in the response headers of the current HTTP request.
     * The cookies API can be used in both server actions and API route handlers.
     * @param token The session token to set in the cookie.
     * @param expiresAt The expiration date of the cookie.
     */
    async set(token: string, expiresAt: Date) {
      const cookieStore = await cookies();
      cookieStore.set(config.sessionCookie.name, token, {
        httpOnly: config.sessionCookie.attributes.httpOnly,
        sameSite: config.sessionCookie.attributes.sameSite,
        secure: config.sessionCookie.attributes.secure,
        expires: expiresAt,
        path: config.sessionCookie.attributes.path,
      });
    },

    /**
     * Gets the session token stored in the cookie.
     * @returns The session token stored in the cookie, or null if not found.
     */
    async get(): Promise<string | null> {
      const cookieStore = await cookies();
      return cookieStore.get(config.sessionCookie.name)?.value ?? null;
    },

    /**
     * Sets an empty session token cookie in the response headers of the current HTTP request.
     * This cookie overwrites any existing session token cookie on the client and expires immediately.
     * This is a common and reliable pattern for deleting cookies.
     */
    async clear() {
      const cookieStore = await cookies();
      cookieStore.set(config.sessionCookie.name, "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: config.sessionCookie.attributes.path,
      });
    },
  };

  const _session = {
    /**
     * Creates a session record in the database for a given user and token.
     * The token itself is never stored, but rather the token's SHA-256 hash.
     * @param token The session token.
     * @param userId The ID of the user associated with the session.
     * @returns The newly created session record.
     */
    async create(token: string, userId: UserId): Promise<DatabaseSession> {
      // Hash the provided token using SHA-256
      const id = _token.hash(token);

      // The token will expire after the expiration interval
      const expiresAt = new Date(
        Date.now() + config.session.expirationInterval,
      );

      // Create the session record in the database
      const session = await _database.createSession(id, userId, expiresAt);

      return session;
    },

    async validate(token: string): Promise<AuthState> {
      // Hash the provided token using SHA-256
      const id = _token.hash(token);

      // Retrieve the session record from the database
      const record = await _database.getSession(id);

      // If the session record doesn't exist, return null values
      if (record === null) return { session: null, user: null };

      const { user, ...session } = record;

      // If the session has expired, delete it and return null values
      if (Date.now() >= session.expiresAt.getTime()) {
        await _database.deleteSession(id);
        return { session: null, user: null };
      }

      // If the session is within the refresh interval, then update it with a new expiration
      if (
        Date.now() >=
        session.expiresAt.getTime() - config.session.refreshInterval
      ) {
        session.expiresAt = new Date(
          Date.now() + config.session.expirationInterval,
        );
        await prisma.session.update({
          where: { id },
          data: { expiresAt: session.expiresAt },
        });
      }

      return { session, user: config.getAuthUser(user) };
    },

    /**
     * Deletes a session record from the database as part of the session invalidation process.
     * @param id The ID of the session record to delete.
     */
    async delete(id: string) {
      await _database.deleteSession(id);
    },
  };

  /**
   * Authenticates a user by validating their session token.
   * @returns An object containing the authenticated session and user, or null values if not authenticated.
   */
  const auth = cache(async (): Promise<AuthState> => {
    // Get the session token from the cookie
    const token = await _cookie.get();
    if (!token) return { session: null, user: null };

    // Validate the session token
    const result = await _session.validate(token);
    return result;
  });

  /**
   * Authenticates a user by validating their session token and redirects to the provided path if not authenticated.
   * @param path The path to redirect to if the user is not authenticated.
   * @returns The authenticated session and user, or null values if not authenticated.
   */
  async function authOrRedirect(path: string) {
    const authState = await auth();
    if (!authState.user) redirect(path);
    return authState;
  }

  /**
   * Creates a new session for a given user ID by creating a new session record in the database and setting a session token cookie.
   * @param userId The ID of the user associated with the session.
   */
  async function createSession(userId: UserId) {
    // Generate a new session token
    const token = _token.generate();

    // Create a new session record in the database
    const session = await _session.create(token, userId);

    // Set the session token cookie
    await _cookie.set(token, session.expiresAt);
  }

  /**
   * Invalidates the current session by deleting the session record from the database and setting an empty session token cookie.
   */
  async function invalidateSession() {
    // Get the session token from the cookie
    const { session } = await auth();
    if (!session) return;

    // Delete the session record from the database
    await _session.delete(session.id);

    // Set an empty session token cookie
    await _cookie.clear();
  }

  // Public API
  const lucia = { auth, authOrRedirect, createSession, invalidateSession };

  _luciaInstance = lucia;

  return lucia;
}
