import { paths } from "@/lib/paths";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2 className="text-lg">Home Page</h2>

      <Link href={paths.tickets()} className="underline">
        Tickets
      </Link>
    </div>
  );
}
