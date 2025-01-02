"use client";

import SortSelect, { SortSelectOption } from "@/components/sort-select";
import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "@/features/ticket/search-params";

type Props = {
  options: SortSelectOption[];
};

export default function TicketSortSelect({ options }: Props) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect options={options} value={sort} onChange={setSort} />;
}
