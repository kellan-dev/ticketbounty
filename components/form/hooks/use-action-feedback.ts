import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type UseActionFeedbackArgs = {
  state: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (args: UseActionFeedbackArgs) => void;
  onError?: (args: UseActionFeedbackArgs) => void;
};

export default function useActionFeedback(
  state: ActionState,
  options: UseActionFeedbackOptions,
) {
  const prevTimestamp = useRef(state.timestamp);
  const isUpdate = prevTimestamp.current !== state.timestamp;

  useEffect(() => {
    if (!isUpdate) return;
    if (state.status === "success") options.onSuccess?.({ state });
    if (state.status === "error") options.onError?.({ state });
    prevTimestamp.current = state.timestamp;
  }, [isUpdate, state, options]);
}
