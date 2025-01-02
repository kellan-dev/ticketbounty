"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, placeholder, onChange }: Props) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}
