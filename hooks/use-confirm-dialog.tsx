import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
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
import { cloneElement, useActionState, useState } from "react";

type Options = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
};

export default function useConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  action,
  trigger,
}: Options) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((s) => !s),
  });

  const [state, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const handleSuccess = () => setIsOpen(false);

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
            <Form action={formAction} state={state} onSuccess={handleSuccess}>
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
}
