"use server";

import { lucia } from "../lucia";

export async function getAuth() {
  return await lucia.auth();
}
