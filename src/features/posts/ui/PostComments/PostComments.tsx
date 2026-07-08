import type { components } from "@/shared/api/schema";
import { Card, CardHeader } from "@/shared/components";
type Comment = components["schemas"]["Comment"];

type Props = {
  comments: Comment[];
};

const ICONS = {
  like: "\u{1F44D}",
} as const;

export const PostComments = ({ comments }: Props) => {
  if (comments.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Card>
              <CardHeader className="flex-1">
                <p className="font-medium">
                  {comment.user?.fullName ||
                    comment.user?.username ||
                    "Anonymous"}
                </p>
                <p className="text-muted-foreground">{comment.body}</p>
                <div className="flex items-center gap-2">
                  <span>
                    {ICONS.like} {comment.likes || 0}
                  </span>
                </div>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};
