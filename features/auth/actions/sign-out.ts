"use server";

import { getAuth, invalidateSession } from "@/features/auth/auth";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";

export default async function signOut() {
  const { session } = await getAuth();
  if (!session) redirect(paths.signIn());

  await invalidateSession();

  redirect(paths.signIn());
}
