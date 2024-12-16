import { initialTickets } from "@/lib/data";
import { Ticket } from "../types";

export async function getTickets(): Promise<Ticket[]> {
  // Simulate data fetching
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => resolve(initialTickets));
}
