import Heading from "@/components/heading";
import { Suspense } from "react";
import TicketList from "@/features/ticket/components/ticket-list";
import Spinner from "@/components/spinner";
import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";

export default async function Page() {
  await lucia.authOrRedirect(paths.signIn());

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
