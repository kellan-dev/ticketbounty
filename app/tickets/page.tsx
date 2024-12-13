import { initialTickets } from "@/lib/data";
import { paths } from "@/lib/paths";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <h2 className="text-lg">{ticket.title}</h2>
          <Link href={paths.ticket(ticket.id)} className="text-sm underline">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
