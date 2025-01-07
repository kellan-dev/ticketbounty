"use client";

import { Button } from "@/components/ui/button";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";

export default function SubmitButton({
  className,
  label,
  icon,
  variant = "default",
  size = "default",
  disabled = false,
  pending = false,
}: {
  className?: string;
  label?: string;
  icon?: React.ReactElement & { props: { className?: string } };
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  pending?: boolean;
}) {
  return (
    <Button
      className={className}
      type="submit"
      disabled={pending || disabled}
      size={size}
      variant={variant}
    >
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {label}
      {!pending && icon && cloneElement(icon, { className: "h-4 w-4" })}
    </Button>
  );
}
