import "server-only";

import { prisma } from "@/lib/prisma";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import type { User as DatabaseUser, Session } from "@prisma/client";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "auth_session";
const SESSION_REFRESH_THRESHOLD = 1000 * 60 * 60 * 24 * 15;
const SESSION_EXPIRATION_THRESHOLD = 1000 * 60 * 60 * 24 * 30;

// These are the attributes that will be returned in the user object when a user is authenticated.
type AuthUser = {
  username: string;
  email: string;
};

// This is the type that will be returned when a user is authenticated.
export type AuthState =
  | { session: Session; user: AuthUser }
  | { session: null; user: null };

// This ensures that the user ID is the same type as defined in the database schema
export type UserId = DatabaseUser["id"];

/**
 * Generates a random session token that can be used to authenticate a user.
 * This token is stored by the client in a cookie, and is provided by the client when making requests to the server.
 * The server hashes the provided token and compares it to the hashed token stored in the database.
 * If the tokens match, the user is authenticated.
 * @returns A random session token.
 */
export function generateSessionToken(): string {
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
}

/**
 * Hashes a session token using SHA-256. The resulting hash is safe to store in the database, as it can't be reverse-engineered to produce the original token.
 * @param token The session token to hash.
 * @returns The hashed token as a hexadecimal string.
 */
function hashSessionToken(token: string): string {
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
}

/**
 * Creates a session record in the database for a given user and token.
 * The token itself is never stored, but rather the token's SHA-256 hash.
 * @param token The session token.
 * @param userId The ID of the user associated with the session.
 * @returns The newly created session record.
 */
export async function createSessionRecord(
  token: string,
  userId: UserId,
): Promise<Session> {
  // Hash the provided token using SHA-256
  const id = hashSessionToken(token);

  // The token will expire after 30 days
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_THRESHOLD);

  // Create the session record in the database
  const session = await prisma.session.create({
    data: { id, userId, expiresAt },
  });

  return session;
}

export async function validateSessionToken(token: string): Promise<AuthState> {
  // Hash the provided token using SHA-256
  const id = hashSessionToken(token);

  // Retrieve the session record from the database
  const record = await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });

  // If the session record doesn't exist, return null values
  if (record === null) return { session: null, user: null };

  const { user, ...session } = record;

  // If the session has expired, delete it and return null values
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id } });
    return { session: null, user: null };
  }

  // If the session is within 15 days of expiration, refresh it
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_THRESHOLD) {
    session.expiresAt = new Date(Date.now() + SESSION_EXPIRATION_THRESHOLD);
    await prisma.session.update({
      where: { id },
      data: { expiresAt: session.expiresAt },
    });
  }

  return { session, user: getAuthUser(user) };
}

/**
 * Maps a user record from the database to an AuthUser object.
 * @param user The user record from the database.
 * @returns An AuthUser object.
 */
function getAuthUser(user: DatabaseUser): AuthUser {
  return {
    username: user.username,
    email: user.email,
  };
}

/**
 * Deletes a session record from the database as part of the session invalidation process.
 * @param id The ID of the session record to delete.
 */
export async function deleteSessionRecord(id: string): Promise<void> {
  await prisma.session.delete({ where: { id } });
}

/**
 * Sets a session token cookie in the response headers of the current HTTP request.
 * The cookies API can be used in both server actions and API route handlers.
 * @param token The session token to set in the cookie.
 * @param expiresAt The expiration date of the cookie.
 */
export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Sets an empty session token cookie in the response headers of the current HTTP request.
 * This cookie overwrites any existing session token cookie on the client and expires immediately.
 * This is a common and reliable pattern for deleting cookies.
 */
export async function clearSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
