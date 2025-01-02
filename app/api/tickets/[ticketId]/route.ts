import { getTicket } from "@/features/ticket/queries/get-ticket";

type Params = Promise<{
  ticketId: string;
}>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  return Response.json(ticket);
}
