export type TicketStatus = "OPEN" | "WORKING" | "CLOSED";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};
