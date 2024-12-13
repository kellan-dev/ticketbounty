import { paths } from "@/lib/paths";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Home Page</h2>
        <p className="text-muted-foreground text-sm">
          Your home place to start
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <Link href={paths.tickets()} className="underline">
          Tickets
        </Link>
      </div>
    </div>
  );
}
