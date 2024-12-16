"use server";

import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({ where: { id } });

  redirect(paths.tickets());
}
