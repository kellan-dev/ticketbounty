"use client";

import CommentItem from "./comment-item";
import { CommentWithMetadata } from "../types";
import { getComments } from "../actions/get-comments";
import CommentCreateForm from "./comment-create-form";
import { PaginatedData } from "@/lib/types/pagination";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export default function Comments({ ticketId, paginatedComments }: Props) {
  const queryClient = useQueryClient();

  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.metadata.nextCursor,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleDeleteComment = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const handleCreateComment = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <CommentCreateForm
        ticketId={ticketId}
        numComments={comments.length}
        onCreate={handleCreateComment}
      />
      <div className="ml-4 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={() => handleDeleteComment()}
          />
        ))}
      </div>
      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-center text-xs italic">No more comments</p>
        )}
      </div>
    </>
  );
}
