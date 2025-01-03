import CommentItem from "./comment-item";
import { CommentWithMetadata } from "../types";

type Props = {
  comments?: CommentWithMetadata[];
};

export default function Comments({ comments }: Props) {
  return (
    <div className="ml-4 flex flex-col gap-y-2">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
