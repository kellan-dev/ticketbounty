import { initialTickets } from "@/lib/data";
import { Ticket } from "../types";

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const ticket = initialTickets.find((t) => t.id === ticketId);
  return new Promise((resolve) => resolve(ticket || null));
}
