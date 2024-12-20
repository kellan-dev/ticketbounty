"use server";

import { User, Session } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "@/lib/lucia";

export type AuthResult =
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };

export const auth = cache(async (): Promise<AuthResult> => {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);

      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws when you attempt to set cookie when rendering page.
    // This is why we need to catch it here and prevent it from bubbling.
  }

  return result;
});
