"use client";

import TicketItem from "@/features/ticket/components/ticket-item";
import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { Ticket } from "@/features/ticket/types";
import { getTickets } from "@/features/ticket/queries/get-tickets";

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    (async () => {
      const tickets = await getTickets();
      setTickets(tickets);
    })();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </section>
    </div>
  );
}
