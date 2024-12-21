"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/lib/paths";

export default function PublicNav() {
  return (
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
}
