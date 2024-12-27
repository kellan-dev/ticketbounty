import { headers } from "next/headers";

/**
 * Provides CSRF protection for API endpoints that should only be accessible from the same origin (e.g., our application).
 */
export async function verifySameOrigin() {
  const headersList = await headers();
  const origin = headersList.get("Origin");
  const host = headersList.get("Host");

  if (origin && new URL(origin).host !== host) {
    throw new Error("CSRF Validation Failed");
  }
}

/**
 * A wrapper providing CSRF protection for API endpoints that should only be accessible from the same origin (e.g., our application).
 */
export function requireSameOrigin<T>(handler: () => Promise<T>) {
  return async () => {
    await verifySameOrigin();
    return handler();
  };
}
