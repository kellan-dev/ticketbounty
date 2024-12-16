import { TicketStatus } from "@prisma/client";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

// For each ticket status, we will define an icon
export type TicketIcons = {
  [key in TicketStatus]: React.ReactElement;
};

export const TICKET_ICONS: TicketIcons = {
  OPEN: <LucideFileText />,
  WORKING: <LucidePencil />,
  CLOSED: <LucideCircleCheck />,
};
