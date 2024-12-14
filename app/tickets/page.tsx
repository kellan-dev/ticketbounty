import { initialTickets } from "@/lib/data";
import TicketItem from "@/features/ticket/components/ticket-item";
import Heading from "@/components/heading";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </section>
    </div>
  );
}
