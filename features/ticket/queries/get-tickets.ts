import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) {
  const { user } = await lucia.auth();

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
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: { count, hasNextPage: count > skip + take },
  };
}
