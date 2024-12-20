"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TICKET_STATUS_LABELS } from "../constants";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";
import useConfirmDialog from "@/hooks/use-confirm-dialog";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";

type Props = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export default function TicketMoreMenu({ ticket, trigger }: Props) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const ticketStatusRadioGroupItems = (
    Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>
  ).map((key) => (
    <DropdownMenuRadioItem key={key} value={key}>
      {TICKET_STATUS_LABELS[key]}
    </DropdownMenuRadioItem>
  ));

  const handleUpdateTicketStatus = async (status: string) => {
    toast.loading("Updating ticket status...", { id: ticket.id });

    const result = await updateTicketStatus(ticket.id, status as TicketStatus);

    if (result.status === "success") {
      toast.success(result.message, { id: ticket.id });
    }

    if (result.status === "error") {
      toast.error(result.message, { id: ticket.id });
    }
  };

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleUpdateTicketStatus}
          >
            {ticketStatusRadioGroupItems}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
