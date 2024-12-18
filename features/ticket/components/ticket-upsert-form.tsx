"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { Ticket } from "@prisma/client";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";

type Props = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: Props) {
  const [state, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} state={state}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={(state.payload?.get("title") as string) ?? ticket?.title}
      />
      <FieldError state={state} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (state.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError state={state} name="content" />

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
}
