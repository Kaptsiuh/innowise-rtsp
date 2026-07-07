import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Route as PostRoute } from "@/app/routes/posts.$postId";
import { cn } from "@/shared/lib/utils";
import type { components } from "@/shared/api/schema";
type Post = components["schemas"]["Post"];

type Props = {
  post: Post;
  variant?: "card" | "detail";
};

const ICONS = {
  like: "\u{1F44D}",
  dislike: "\u{1F44E}",
  view: "\u{1F441}",
} as const;

export const PostCard = ({ post, variant = "card" }: Props) => {
  const isDetail = variant === "detail";

  return (
    <div
      className={
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
      }
    >
      <div className="flex flex-1 flex-col p-4 ">
        <h3
          className={cn(
            "mb-2 line-clamp-2 text-base font-semibold text-gray-900",
            isDetail ? "text-3xl" : "line-clamp-2 text-base",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mb-2  text-gray-600",
            isDetail ? "text-base leading-relaxed" : "line-clamp-3 text-sm",
          )}
        >
          {post.body}
        </p>
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
        {!isDetail && (
          <Link to={PostRoute.to} params={{ postId: String(post.id) }}>
            <Button variant="outline" className="mt-3 w-full cursor-pointer ">
              Read more
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
