import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginatedData } from "@/lib/types/pagination";

type PageAndSize = {
  page: number;
  size: number;
};

type Props = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  metadata: PaginatedData<unknown>["metadata"];
};

export default function Pagination({
  pagination,
  onPagination,
  metadata: { count, hasNextPage },
}: Props) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = Math.min(startOffset - 1 + pagination.size, count);
  const label = `Showing ${startOffset}-${endOffset} of ${count}`;

  const handlePreviousPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const handleNextPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const handleChangeSize = (size: string) => {
    onPagination({
      page: 0,
      size: parseInt(size),
    });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page <= 0}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
