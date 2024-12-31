import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { TICKET_ICONS } from "@/features/ticket/constants";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { toCurrencyFromCents } from "@/lib/currency";
import TicketMoreMenu from "./ticket-more-menu";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

type Props = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
  isDetail?: boolean;
};

export default async function TicketItem({ ticket, isDetail }: Props) {
  const { user } = await lucia.auth();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      {/* Prefetch fetches and caches the page when the Link is in the viewport */}
      <Link prefetch href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner && (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={paths.editTicket(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = isTicketOwner && (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={cn(
        "flex w-full max-w-[420px] gap-x-1",
        isDetail ? "max-w-[580px]" : "max-w-[420px]",
      )}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <h3>{TICKET_ICONS[ticket.status]}</h3>
            <p className="truncate">{ticket.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "whitespace-break-spaces",
              !isDetail && "line-clamp-3",
            )}
          >
            {ticket.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>{editButton}</>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
        {moreMenu}
      </div>
    </div>
  );
}
