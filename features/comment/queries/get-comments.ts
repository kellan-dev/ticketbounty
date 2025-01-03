import "server-only";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function getComments(ticketId: string) {
  const { user } = await lucia.auth();

  const comments = await prisma.comment.findMany({
    where: { ticketId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { username: true } } },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(user, comment),
  }));
}
