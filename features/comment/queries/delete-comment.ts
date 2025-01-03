"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function deleteComment(id: string) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment || !isOwner(user, comment)) {
    return toActionState("error", "Unauthorized");
  }

  try {
    await prisma.comment.delete({ where: { id } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.ticket(comment.ticketId));

  return toActionState("success", "Comment deleted");
}
