"use client";

import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { useActionState } from "react";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import FieldError from "@/components/form/field-error";
import { LucideSend } from "lucide-react";
import { CommentWithMetadata } from "../types";

type Props = {
  ticketId: string;
  numComments?: number;
  onCreate?: (comment: CommentWithMetadata) => void;
};

export default function CommentCreateForm({
  ticketId,
  numComments,
  onCreate,
}: Props) {
  const [state, action, isPending] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (state: ActionState) => {
    const comment = state.data as CommentWithMetadata;
    onCreate?.(comment);
  };

  return (
    <Form action={action} state={state} onSuccess={handleSuccess}>
      <Textarea
        name="content"
        placeholder={
          numComments
            ? "✏  What's on your mind?"
            : "✏  Be the first to comment on this issue"
        }
        className="bg-card p-4 text-sm"
      />
      <FieldError name="content" state={state} />
      <SubmitButton
        icon={<LucideSend />}
        variant="outline"
        size="icon"
        pending={isPending}
        disabled={isPending}
        className="aspect-circle self-end"
      />
    </Form>
  );
}
