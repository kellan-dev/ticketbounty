"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/lib/lucia";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Required field" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export default async function signIn(state: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return toActionState("error", "Incorrect email or password", formData);

    const validPassword = await verify(user.passwordHash, password);
    if (!validPassword)
      return toActionState("error", "Incorrect email or password", formData);

    await lucia.createSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(paths.tickets());
}
