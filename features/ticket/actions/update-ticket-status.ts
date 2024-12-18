"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { paths } from "@/lib/paths";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  try {
    await prisma.ticket.update({ where: { id }, data: { status } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.tickets());

  return toActionState("success", "Ticket status updated");
}
