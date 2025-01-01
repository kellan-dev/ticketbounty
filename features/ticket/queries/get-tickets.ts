import { prisma } from "@/lib/prisma";

export async function getTickets(userId?: string) {
  return await prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
