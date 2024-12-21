import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import {
  AuthState,
  clearSessionTokenCookie,
  createSessionRecord,
  deleteSessionRecord,
  generateSessionToken,
  setSessionTokenCookie,
  UserId,
  validateSessionToken,
} from "./auth-core";

/**
 * Primary method for validating a session within a server context.
 * This includes server components, server actions, and API route handlers.
 * It does not include middleware.
 * @returns The session record and user associated with the session token, or null values if the session is not valid.
 */
export const getAuth = cache(async (): Promise<AuthState> => {
  const cookieStore = await cookies();

  // Get the session token from the cookie
  const token = cookieStore.get("auth_session")?.value ?? null;
  if (!token) return { session: null, user: null };

  // Validate the session token
  const result = await validateSessionToken(token);
  return result;
});

/**
 * Creates a new session for a given user ID by creating a new session record in the database and setting a session token cookie.
 * @param userId The ID of the user associated with the session.
 */
export async function createSession(userId: UserId): Promise<void> {
  // Generate a new session token
  const token = generateSessionToken();

  // Create a new session record in the database
  const session = await createSessionRecord(token, userId);

  // Set the session token cookie
  await setSessionTokenCookie(token, session.expiresAt);
}

/**
 * Invalidates the current session by deleting the session record from the database and setting an empty session token cookie.
 * @returns A promise that resolves when the session is invalidated.
 */
export async function invalidateSession(): Promise<void> {
  // Get the session token from the cookie
  const { session } = await getAuth();
  if (!session) return;

  // Delete the session record from the database
  await deleteSessionRecord(session.id);

  // Set an empty session token cookie
  await clearSessionTokenCookie();
}
