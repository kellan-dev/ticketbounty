"use client";

import CommentItem from "./comment-item";
import { CommentWithMetadata } from "../types";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { useState } from "react";
import CommentCreateForm from "./comment-create-form";
import { PaginatedData } from "@/types/pagination";

type Props = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export default function Comments({ ticketId, paginatedComments }: Props) {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(
      ticketId,
      metadata.nextCursor,
    );
    const moreComments = morePaginatedComments.list;
    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleCreateComment = (comment: CommentWithMetadata) => {
    setComments([comment, ...comments]);
  };

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
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
}
