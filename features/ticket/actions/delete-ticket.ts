"use server";

import { setCookieByKey } from "@/actions/cookies";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({ where: { id } });

  revalidatePath(paths.tickets());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(paths.tickets());
}
