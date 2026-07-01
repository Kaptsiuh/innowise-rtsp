import type { Post } from "@/features/posts/types/post";
import { Button } from "../ui/button";

type Props = {
  post: Post;
};

const ICONS = {
  like: "👍",
  dislike: "👎",
  view: "👁️",
} as const;

export const PostCard = ({ post }: Props) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <div className="flex flex-1 flex-col p-4 ">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
          {post.title}
        </h3>
        <p className="line-clamp-3 mb-2  text-sm text-gray-600">{post.body}</p>
        <div className="flex flex-wrap gap-1 pb-4 ">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-green-500">{ICONS.like}</span>
              <span>{post.reactions.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500">{ICONS.dislike}</span>
              <span>{post.reactions.dislikes}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{ICONS.view}</span>
            <span>{post.views}</span>
          </div>
        </div>
        <Button variant="outline" className="mt-3 w-full cursor-pointer ">
          Read more
        </Button>
      </div>
    </div>
  );
};
