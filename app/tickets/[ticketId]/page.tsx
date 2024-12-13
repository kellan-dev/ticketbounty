import { initialTickets } from "@/lib/data";

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
  const ticket = initialTickets.find((t) => t.id === ticketId);

  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
}
