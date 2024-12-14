import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LucideKanban } from "lucide-react";
import { paths } from "@/lib/paths";
import ThemeSelect from "@/components/theme/theme-select";

export default function Header() {
  return (
    <header>
      <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
        <div className="flex items-center gap-x-2">
          {/* There are a couple ways we can use the Button styles here. */}
          {/* The first way is to use the Button component with asChild prop. */}
          <Button asChild variant="ghost">
            <Link href={paths.home()}>
              <LucideKanban className="!h-6 !w-6" />
              <h1 className="text-lg font-semibold">TicketBounty</h1>
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <ThemeSelect />
          {/* The second way is to use the buttonVariants() utility. */}
          <Link
            href={paths.tickets()}
            className={buttonVariants({ variant: "default" })}
          >
            Tickets
          </Link>
        </div>
      </nav>
    </header>
  );
}
