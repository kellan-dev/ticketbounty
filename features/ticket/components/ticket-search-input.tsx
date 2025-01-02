"use client";

import { useQueryState } from "nuqs";
import { searchParser } from "@/features/ticket/search-params";
import SearchInput from "@/components/search-input";

type Props = {
  placeholder: string;
};

export default function TicketSearchInput({ placeholder }: Props) {
  const [search, setSearch] = useQueryState("search", searchParser);
  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
}
