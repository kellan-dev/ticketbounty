import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideKanban } from "lucide-react";
import { paths } from "@/lib/paths";
import ThemeSelect from "@/components/theme/theme-select";
import { getAuth } from "@/features/auth/auth";
import PublicNav from "./public-nav";
import ProtectedNav from "./protected-nav";

export default async function Header() {
  const { session } = await getAuth();

  return (
    <header>
      <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full animate-header-from-top justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
        <div className="flex items-center gap-x-2">
          <Button asChild variant="ghost">
            <Link href={paths.home()}>
              <LucideKanban className="!h-6 !w-6" />
              <h1 className="text-lg font-semibold">TicketBounty</h1>
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <ThemeSelect />
          {session ? <ProtectedNav /> : <PublicNav />}
        </div>
      </nav>
    </header>
  );
}
