import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cloneElement, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type ReactElementWithOnClick = React.ReactElement<{ onClick?: () => void }>;

type Options = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger:
    | ReactElementWithOnClick
    | ((isPending: boolean) => ReactElementWithOnClick);
  onSuccess?: (state: ActionState) => void;
};

export default function useConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  action,
  trigger,
  onSuccess,
}: Options) {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(state, {
    onSuccess: ({ state }) => {
      if (state.message) toast.success(state.message);
      onSuccess?.(state);
    },
    onError: ({ state }) => {
      if (state.message) toast.error(state.message);
    },
  });

  useEffect(() => {
    if (isPending) toast.loading("Processing...", { id: "processing" });
    return () => {
      toast.dismiss("processing");
    };
  }, [isPending, state.status]);

  const dialogTrigger = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((s) => !s),
    },
  );

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
}
