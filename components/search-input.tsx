"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set("search", value);
      else params.delete("search");

      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    250,
  );

  return <Input placeholder={placeholder} onChange={handleSearch} />;
}
