import { initialTickets } from "@/lib/data";
import { paths } from "@/lib/paths";
import Link from "next/link";

const TICKET_ICONS = {
  open: "o",
  working: "w",
  closed: "x",
};

export default function Page() {
  return (
    <div>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <div>{TICKET_ICONS[ticket.status]}</div>
          <h2 className="text-lg">{ticket.title}</h2>
          <Link href={paths.ticket(ticket.id)} className="text-sm underline">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
