import { TicketStatus } from "@prisma/client";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

export type TicketIcons = {
  [key in TicketStatus]: React.ReactElement;
};

export const TICKET_ICONS: TicketIcons = {
  OPEN: <LucideFileText />,
  WORKING: <LucidePencil />,
  CLOSED: <LucideCircleCheck />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  WORKING: "Working",
  CLOSED: "Closed",
};
