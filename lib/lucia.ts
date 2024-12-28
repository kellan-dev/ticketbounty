import { createLucia } from "@/lib/lucia/core";

/**
 * Defines the properties of the Auth objects returned by lucia.auth().
 * Avoid returning sensitive data.
 */
declare module "@/lib/lucia/core" {
  interface AuthUser {
    id: string;
    username: string;
    email: string;
  }
}

export const lucia = createLucia({
  getAuthUser: (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
  }),
});
