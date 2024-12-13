import Heading from "@/components/heading";
import { paths } from "@/lib/paths";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Home Page" description="Your home place to start" />
      <div className="flex flex-1 flex-col items-center">
        <Link href={paths.tickets()} className="underline">
          Tickets
        </Link>
      </div>
    </div>
  );
}
