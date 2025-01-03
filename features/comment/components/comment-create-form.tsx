"use client";

import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../queries/create-comment";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import FieldError from "@/components/form/field-error";
import { LucideSend } from "lucide-react";

type Props = {
  ticketId: string;
};

export default function CommentCreateForm({ ticketId }: Props) {
  const [state, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );
  return (
    <Form action={action} state={state}>
      <Textarea
        name="content"
        placeholder="✏ What's on your mind?"
        className="bg-card"
      />
      <FieldError name="content" state={state} />
      <SubmitButton
        icon={<LucideSend />}
        variant="outline"
        size="icon"
        className="aspect-circle self-end"
      />
    </Form>
  );
}
