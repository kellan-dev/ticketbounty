import "server-only";
import { prisma } from "@/lib/prisma";

export function getComments(ticketId: string) {
  return prisma.comment.findMany({
    where: { ticketId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { username: true } } },
  });
}
