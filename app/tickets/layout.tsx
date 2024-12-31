import React from "react";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";

// ! For convenience only; does not provide strong security, since layouts can be bypassed. I'm leaving this layout here for learning purposes, but I'm actually verifying auth in each protected page individually.
export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await lucia.authOrRedirect(paths.signIn());

  return <>{children}</>;
}
