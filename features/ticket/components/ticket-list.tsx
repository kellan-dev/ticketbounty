import { getTickets } from "@/features/ticket/queries/get-tickets";
import TicketItem from "./ticket-item";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import Placeholder from "@/components/placeholder";
import TicketSearchInput from "@/features/ticket/components/ticket-search-input";
import TicketSortSelect from "@/features/ticket/components/ticket-sort-select";
import TicketPagination from "@/features/ticket/components/ticket-pagination";

type Props = { userId?: string; searchParams: ParsedSearchParams };

export default async function TicketList({ userId, searchParams }: Props) {
  const { list: tickets, metadata } = await getTickets(userId, searchParams);

  return (
    <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      <div className="grid w-full max-w-2xl grid-cols-[auto_160px] gap-x-2">
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
      <div className="w-full max-w-2xl">
        <TicketPagination metadata={metadata} />
      </div>
    </section>
  );
}
