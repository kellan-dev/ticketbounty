"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type Props = {
  defaultValue: string;
  options: Option[];
};

export default function SortSelect({ defaultValue, options }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) params.delete("sort");
    else if (value) params.set("sort", value);
    else params.delete("sort");

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
