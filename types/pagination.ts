export type PaginatedData<T> = {
  list: T[];
  metadata: {
    count: number;
    hasNextPage: boolean;
    nextCursor?: string;
  };
};
