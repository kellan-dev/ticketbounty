"use server";

import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";

export default async function signOut() {
  const { session } = await lucia.auth();
  if (!session) redirect(paths.signIn());

  await lucia.invalidateSession();

  redirect(paths.signIn());
}
