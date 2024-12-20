"use server";

import { auth } from "@/lib/auth";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signOut() {
  const { session } = await auth();
  if (!session) redirect(paths.signIn());

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect(paths.signIn());
}
