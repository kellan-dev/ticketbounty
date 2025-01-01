import { NavItem } from "./types";
import { paths } from "@/lib/paths";
import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <LucideLibrary />,
    href: paths.home(),
  },
  {
    title: "My Tickets",
    icon: <LucideBook />,
    href: paths.tickets(),
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: paths.accountProfile(),
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
