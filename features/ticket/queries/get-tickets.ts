import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "@/features/ticket/search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: { contains: searchParams.search, mode: "insensitive" },
    },
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
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
