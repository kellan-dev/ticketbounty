"use client";

import Link from "next/link";
import signOut from "@/features/auth/actions/sign-out";
import SubmitButton from "@/components/form/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { LucideLogOut } from "lucide-react";
import { paths } from "@/lib/paths";

export default function ProtectedNav() {
  return (
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
  );
}
