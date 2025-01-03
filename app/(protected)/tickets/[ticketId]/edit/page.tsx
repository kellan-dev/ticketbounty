import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";
import { paths } from "@/lib/paths";
import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{
  ticketId: string;
}>;

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) notFound();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: paths.home() },
          { title: ticket.title, href: paths.ticket(ticket.id) },
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex flex-1 flex-col items-center justify-center">
        <CardCompact
          className="w-full max-w-[420px] animate-fade-in-from-top"
          title="Edit Ticket"
          description="Edit an existing ticket"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
}
