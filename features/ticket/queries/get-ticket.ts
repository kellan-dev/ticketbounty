import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function getTicket(ticketId: string) {
  const { user } = await lucia.auth();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!ticket) return null;

  return { ...ticket, isOwner: isOwner(user, ticket) };
}
