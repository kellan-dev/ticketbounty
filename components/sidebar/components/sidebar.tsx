"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { navItems } from "../constants";
import SidebarItem from "./sidebar-item";
import { useAuth } from "@/lib/lucia/hooks";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/lib/paths";
import { paths } from "@/lib/paths";

export default function Sidebar() {
  const { auth, isFetched } = useAuth();
  const pathname = usePathname();
  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((i) => i.href),
    [paths.signIn(), paths.signUp()],
  );

  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!isFetched || !auth?.user) return null;

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  return (
    <nav
      className={cn(
        "h-screen w-[72px] animate-sidebar-from-left border-r pt-24",
        isTransition && "duration-200",
        isOpen && "md:w-60",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
              isActive={activeIndex === navItems.indexOf(navItem)}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
