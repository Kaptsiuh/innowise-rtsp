import type { components } from "@/shared/api/schema";
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
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {comment.user?.fullName ||
                      comment.user?.username ||
                      "Anonymous"}
                  </p>
                  <p className="text-gray-600 mt-1">{comment.body}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <span>
                      {ICONS.like} {comment.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
