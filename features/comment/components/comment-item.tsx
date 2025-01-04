import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
import CommentItemMenu from "./comment-item-menu";
import { format } from "date-fns";

type Props = {
  comment: CommentWithMetadata;
  onDelete: () => void;
};

export default function CommentItem({ comment, onDelete }: Props) {
  return (
    <Card className="group relative flex flex-1 flex-col gap-y-1 p-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {comment.user?.username ?? "Deleted User"}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(comment.createdAt, "yyyy-MM-dd, HH:mm")}
        </p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
      {comment.isOwner && (
        <CommentItemMenu comment={comment} onDelete={onDelete} />
      )}
    </Card>
  );
}
