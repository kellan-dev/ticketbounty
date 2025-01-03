import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
import CommentItemMenu from "./comment-item-menu";
import { lucia } from "@/lib/lucia";
import { isOwner } from "@/lib/utils";

type Props = {
  comment: CommentWithMetadata;
};

export default async function CommentItem({ comment }: Props) {
  const { user } = await lucia.auth();
  const isCommentOwner = isOwner(user, comment);

  return (
    <Card className="group relative flex flex-1 flex-col gap-y-1 p-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {comment.user?.username ?? "Deleted User"}
        </p>
        <p className="text-sm text-muted-foreground">
          {comment.createdAt.toLocaleString()}
        </p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
      {isCommentOwner && <CommentItemMenu comment={comment} />}
    </Card>
  );
}
