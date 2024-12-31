"use server";

import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";
import { toActionState } from "@/components/form/utils/to-action-state";

export async function deleteTicket(id: string) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("error", "Unauthorized");
    }

    await prisma.ticket.delete({ where: { id } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.tickets());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(paths.tickets());
}
