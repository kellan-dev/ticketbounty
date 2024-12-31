"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { paths } from "@/lib/paths";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  try {
    // It's good to be explicit about authorization checks
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("error", "Unauthorized");
    }

    await prisma.ticket.update({ where: { id }, data: { status } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.tickets());

  return toActionState("success", "Ticket status updated");
}
