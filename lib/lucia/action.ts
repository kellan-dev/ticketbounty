"use server";

import { getLuciaInstance } from "./core";

// Todo: Using a server action here isn't ideal since they are really intended for data mutations, but this will be fine for now.
export async function authAction() {
  const lucia = getLuciaInstance();
  if (!lucia) {
    throw new Error("Lucia instance not initialized");
  }
  return await lucia.auth();
}
