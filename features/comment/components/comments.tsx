import { getComments } from "@/features/comment/queries/get-comments";
import CommentItem from "./comment-item";

type Props = {
  ticketId: string;
};

export default async function Comments({ ticketId }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const comments = await getComments(ticketId);

  return (
    <div className="ml-4 flex flex-col gap-y-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
