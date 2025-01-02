import { getTickets } from "@/features/ticket/queries/get-tickets";
import TicketItem from "./ticket-item";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import Placeholder from "@/components/placeholder";
import TicketSearchInput from "@/features/ticket/components/ticket-search-input";
import TicketSortSelect from "@/features/ticket/components/ticket-sort-select";

type Props = { userId?: string; searchParams: ParsedSearchParams };

export default async function TicketList({ userId, searchParams }: Props) {
  const tickets = await getTickets(userId, searchParams);

  return (
    <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </section>
  );
}
