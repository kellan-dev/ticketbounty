import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ParsedSearchParams } from "@/features/ticket/search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as Prisma.QueryMode,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets,
    metadata: { count, hasNextPage: count > skip + take },
  };
}
