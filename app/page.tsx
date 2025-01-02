import Heading from "@/components/heading";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/ticket/search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="All Tickets" description="Tickets created by all users" />
      <Suspense fallback={<Spinner />}>
        <TicketList
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
}
