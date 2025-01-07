"use client";

import React, { useEffect, useRef } from "react";
import { useQueryState, useQueryStates } from "nuqs";
import {
  paginationParser,
  paginationOptions,
  searchParser,
} from "@/features/ticket/search-params";
import Pagination from "@/components/pagination";
import { PaginatedData } from "@/lib/types/pagination";
import { TicketWithMetadata } from "../types";

export default function TicketPagination({
  metadata,
}: {
  metadata: PaginatedData<TicketWithMetadata>["metadata"];
}) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;
    setPagination({ ...pagination, page: 0 });
    prevSearch.current = search;
  }, [search, setPagination, pagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      metadata={metadata}
    />
  );
}
