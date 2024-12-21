"use server";

import { getAuth } from "./auth";

// Todo: Using a server action here isn't ideal since they are really intended for data mutations, but this will be fine for now.
export async function authAction() {
  return await getAuth();
}
