import { AuthUser } from "@/lib/lucia/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOwner(
  authUser?: AuthUser | null,
  entity?: { userId: AuthUser["id"] | null } | null,
) {
  if (!entity?.userId) return false;
  return authUser?.id === entity.userId;
}
