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
import CommentCreateForm from "@/features/comment/components/comment-create-form";

type Props = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { username: true } } };
  }> & { isOwner: boolean };
  comments?: React.ReactNode;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, comments, isDetail }: Props) {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      {/* Prefetch fetches and caches the page when the Link is in the viewport */}
      <Link prefetch href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner && (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={paths.editTicket(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = ticket.isOwner && (
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
        "flex w-full max-w-[420px] flex-col gap-y-8",
        isDetail ? "max-w-[580px]" : "max-w-[420px]",
      )}
    >
      <div className="flex gap-x-1">
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
      {isDetail && (
        <div className="ml-4 flex flex-col gap-y-4">
          <CommentCreateForm ticketId={ticket.id} />
          {comments}
        </div>
      )}
    </div>
  );
}
