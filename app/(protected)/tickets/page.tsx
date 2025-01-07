import Heading from "@/components/heading";
import { Suspense } from "react";
import TicketList from "@/features/ticket/components/ticket-list";
import Spinner from "@/components/spinner";
import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/ticket/search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="My Tickets"
        description="Browse and manage tickets created by you"
      />

      <CardCompact
        className="w-full max-w-2xl self-center"
        title="Create Ticket"
        description="Provide a short title and detailed task description"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
}
