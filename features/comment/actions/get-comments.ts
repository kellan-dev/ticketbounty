"use server";

import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function getComments(ticketId: string, cursor?: string) {
  const { user } = await lucia.auth();

  const take = 5;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where: {
        ticketId,
        id: {
          lte: cursor,
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: take + 1,
      include: { user: { select: { username: true } } },
    }),
    prisma.comment.count({ where: { ticketId } }),
  ]);

  const hasNextPage = comments.length === take + 1;
  const nextCursor = hasNextPage ? comments.at(-1)?.id : undefined;
  const list = comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(user, comment),
  }));

  return {
    list: list.slice(0, take),
    metadata: {
      count,
      hasNextPage,
      nextCursor,
    },
  };
}
