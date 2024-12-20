"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideCheck, LucideMoon, LucideSun } from "lucide-react";

export default function ThemeSelect() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LucideMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {["Light", "Dark", "System"].map((item) => (
          <Item key={item} item={item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({ item }: { item: string }) {
  const { theme, setTheme } = useTheme();

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <DropdownMenuItem
      onClick={() => setTheme(item.toLowerCase())}
      className="cursor-pointer"
    >
      {item}
      {theme === item.toLowerCase() && <LucideCheck className="ms-2 size-4" />}
    </DropdownMenuItem>
  );
}

// dark (this comment is included due to a next-themes quirk)
