import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Route } from "@/app/routes/posts.$postId";
import { cn } from "@/shared/lib/utils";
import type { Post } from "@/features/posts/types/post";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

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
    <div className={"group relative flex h-full flex-col"}>
      <CardHeader>
        <CardTitle
          className={cn(
            "font-semibold mb-3",
            isDetail ? "text-3xl" : "line-clamp-2 text-base",
          )}
        >
          {post.title}
        </CardTitle>
      </CardHeader>
      <p
        className={cn(
          "text-muted-foreground mb-3",
          isDetail ? "text-base leading-relaxed" : "line-clamp-3 text-sm",
        )}
      >
        {post.body}
      </p>
      <div className="flex flex-wrap gap-1 pb-4 ">
        {post.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            #{tag}
          </Badge>
        ))}
        {post.tags.length > 3 && (
          <span className="text-xs  text-muted-foreground self-center">
            +{post.tags.length - 3}
          </span>
        )}
      </div>
      <CardContent className="flex-1 flex justify-between">
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
      </CardContent>
      {!isDetail && (
        <Link to={Route.to} params={{ postId: String(post.id) }}>
          <Button variant="outline" className="mt-3 w-full cursor-pointer ">
            Read more
          </Button>
        </Link>
      )}
    </div>
  );
};
