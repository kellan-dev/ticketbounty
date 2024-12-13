import { initialTickets } from "@/lib/data";
import { paths } from "@/lib/paths";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Heading from "@/components/heading";

const TICKET_ICONS = {
  open: <LucideFileText />,
  working: <LucidePencil />,
  closed: <LucideCircleCheck />,
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <div className="animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <h3>{TICKET_ICONS[ticket.status]}</h3>
                <p className="truncate">{ticket.title}</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 whitespace-break-spaces">
                {ticket.content}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={paths.ticket(ticket.id)}
                className="text-sm underline"
              >
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
