"use server";

import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function getComments(ticketId: string, offset?: number) {
  const { user } = await lucia.auth();

  const skip = offset ?? 0;
  const take = 5;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: { user: { select: { username: true } } },
    }),
    prisma.comment.count({ where: { ticketId } }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
