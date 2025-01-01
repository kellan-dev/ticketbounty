import React, { cloneElement } from "react";
import { NavItem } from "../types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { closedClassName } from "../constants";
import { Separator } from "@/components/ui/separator";

type Props = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

export default function SidebarItem({ isOpen, navItem, isActive }: Props) {
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          isActive && "bg-muted font-bold",
        )}
      >
        {cloneElement(navItem.icon, {
          className: "size-5",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "hidden md:block" : "w-[78px]",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
}
