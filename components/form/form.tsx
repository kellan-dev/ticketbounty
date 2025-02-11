import React from "react";
import { toast } from "sonner";
import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type Props = {
  children: React.ReactNode;
  state: ActionState;
  action: (payload: FormData) => void;
  onSuccess?: (state: ActionState) => void;
  onError?: (state: ActionState) => void;
};

export default function Form({
  children,
  state,
  action,
  onSuccess,
  onError,
}: Props) {
  useActionFeedback(state, {
    onSuccess: ({ state }) => {
      if (state.message) toast.success(state.message);
      onSuccess?.(state);
    },
    onError: ({ state }) => {
      if (state.message) toast.error(state.message);
      onError?.(state);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
