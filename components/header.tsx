"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LucideKanban, LucideLogOut } from "lucide-react";
import { paths } from "@/lib/paths";
import ThemeSelect from "@/components/theme/theme-select";
import SubmitButton from "@/components/form/submit-button";
import signOut from "@/features/auth/actions/sign-out";
import useAuth from "@/lib/use-auth";

export default function Header() {
  const auth = useAuth();
  if (!auth) return null;
  const { user } = auth;

  const navItems = user ? (
    <>
      <Link
        href={paths.tickets()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signOut().catch(() => {});
        }}
      >
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={paths.signUp()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={paths.signIn()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

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
          {navItems}
        </div>
      </nav>
    </header>
  );
}
