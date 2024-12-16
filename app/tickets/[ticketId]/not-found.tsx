import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import Placeholder from "@/components/placeholder";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={paths.tickets()}>Go back to Tickets</Link>
        </Button>
      }
    />
  );
}
