import { getTickets } from "@/features/ticket/queries/get-tickets";
import TicketItem from "./ticket-item";
import SearchInput from "@/components/search-input";
import { SearchParams } from "@/features/ticket/search-params";
import Placeholder from "@/components/placeholder";
import SortSelect from "@/components/sort-select";

type Props = { userId?: string; searchParams: SearchParams };

export default async function TicketList({ userId, searchParams }: Props) {
  const tickets = await getTickets(userId, searchParams);

  return (
    <section className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
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
