import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ticket } from "@prisma/client";

type Props = {
  ticket: Ticket;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: Props) {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
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
      </Card>
      {!isDetail && <div className="flex flex-col gap-y-1">{detailButton}</div>}
    </div>
  );
}
