import { getTickets } from "../queries/get-tickets";
import TicketItem from "./ticket-item";

type Props = { userId?: string };

export default async function TicketList({ userId }: Props) {
  const tickets = await getTickets(userId);

  return (
    <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </section>
  );
}
