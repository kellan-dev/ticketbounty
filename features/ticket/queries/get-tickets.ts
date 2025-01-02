import { prisma } from "@/lib/prisma";
import { SearchParams } from "@/features/ticket/search-params";

export async function getTickets(userId?: string, searchParams?: SearchParams) {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams?.search === "string" && {
        title: { contains: searchParams?.search, mode: "insensitive" },
      }),
    },
    orderBy: {
      ...(searchParams?.sort === undefined && { createdAt: "desc" }),
      ...(searchParams?.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
