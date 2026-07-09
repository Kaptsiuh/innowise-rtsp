import { PostCard } from "@/shared/components/PostCard/PostCard";
import type { Post } from "../../types/post";
import { memo } from "react";

type Props = {
  posts: Post[];
};

export const PostList = memo(({ posts }: Props) => {
  if (!posts?.length) {
    return <div className="flex h-64 items-center justify-center text-gray-500">No posts found</div>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
});
