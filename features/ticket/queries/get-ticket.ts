import { prisma } from "@/lib/prisma";

export async function getTicket(ticketId: string) {
  return await prisma.ticket.findUnique({ where: { id: ticketId } });
}
