"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { Ticket } from "@prisma/client";
import SubmitButton from "@/components/form/submit-button";
import { useActionState, useRef } from "react";
import FieldError from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import { toDollars } from "@/lib/currency";
import {
  DatePicker,
  ImperativeHandleFromDatePicker,
} from "@/components/date-picker";

type Props = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: Props) {
  const [state, action, isPending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <Form action={action} state={state} onSuccess={handleSuccess}>
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

      <div className="mb-1 flex gap-x-2">
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step="0.01"
            defaultValue={
              (state.payload?.get("bounty") as string) ??
              (ticket?.bounty ? toDollars(ticket?.bounty) : "")
            }
          />
          <FieldError state={state} name="bounty" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            imperativeHandleRef={datePickerImperativeHandleRef}
            defaultValue={
              (state.payload?.get("deadline") as string) ?? ticket?.deadline
            }
          />
          <FieldError state={state} name="deadline" />
        </div>
      </div>

      <SubmitButton
        label={ticket ? "Update Ticket" : "Create Ticket"}
        pending={isPending}
        disabled={isPending}
        className="self-end"
      />
    </Form>
  );
}
