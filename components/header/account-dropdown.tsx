"use client";

import { AuthUser } from "@/lib/lucia/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import { paths } from "@/lib/paths";
import signOut from "@/features/auth/actions/sign-out";

type Props = {
  user: AuthUser;
};

export default function AccountDropdown({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className="cursor-pointer hover:opacity-80">
            {user.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={paths.accountProfile()} className="cursor-pointer">
            <LucideUser className="size-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={paths.accountPassword()} className="cursor-pointer">
            <LucideLock className="size-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut} className="relative h-[32px] p-0">
            <button
              className="absolute inset-0 ml-2 flex items-center gap-2"
              type="submit"
            >
              <LucideLogOut className="size-4" />
              Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
