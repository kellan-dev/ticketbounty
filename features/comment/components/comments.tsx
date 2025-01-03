import { getComments } from "@/features/comment/queries/get-comments";
import CommentItem from "./comment-item";
import CommentCreateForm from "./comment-create-form";

type Props = {
  ticketId: string;
};

export default async function Comments({ ticketId }: Props) {
  const comments = await getComments(ticketId);

  return (
    <div className="ml-8 flex flex-col gap-y-4">
      <CommentCreateForm ticketId={ticketId} />

      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
