import RedirectToast from "@/components/redirect-toast";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

// Params are async now, so we need to use a Promise
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change
type Params = Promise<{
  ticketId: string;
}>;

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <>
      <div className="flex animate-fade-in-from-top justify-center">
        <TicketItem ticket={ticket} isDetail />
      </div>
      <RedirectToast />
    </>
  );
}
