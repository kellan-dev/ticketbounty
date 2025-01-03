"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export async function createComment(
  ticketId: string,
  state: ActionState,
  formData: FormData,
) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId,
        content: data.content,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(paths.ticket(ticketId));

  return toActionState("success", "Comment created");
}
