import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comment/queries/get-comments";

// Params are async now, so we need to use a Promise
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change
type Params = Promise<{
  ticketId: string;
}>;

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  await lucia.authOrRedirect(paths.signIn());

  const { ticketId } = await params;

  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) notFound();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: paths.home() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex animate-fade-in-from-top justify-center">
        <TicketItem ticket={ticket} comments={comments} isDetail />
      </div>
    </div>
  );
}
