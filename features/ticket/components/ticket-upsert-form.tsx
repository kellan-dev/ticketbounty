import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { Ticket } from "@prisma/client";

type Props = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: Props) {
  return (
    <form
      action={upsertTicket.bind(null, ticket?.id)}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <Button type="submit">{ticket ? "Update" : "Create"}</Button>
    </form>
  );
}
