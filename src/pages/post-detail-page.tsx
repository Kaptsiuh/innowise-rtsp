import { Route } from "@/app/routes/posts.$postId";
import { usePost } from "@/features/posts/hooks/usePost";
import { usePostComments } from "@/features/posts/hooks/usePostComments";
import { PostComments } from "@/features/posts/ui/PostComments/PostComments";
import { PostCard } from "@/shared/components";
import { Link } from "@tanstack/react-router";

export const PostDetailPage = () => {
  const { postId } = Route.useParams();
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = usePost(postId);
  const { data: commentsData, isLoading: commentsLoading } =
    usePostComments(postId);

  if (postLoading || commentsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading post...</div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">Error loading post</div>
      </div>
    );
  }

  const comments = commentsData?.comments ?? [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        to="/posts"
        className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        Back to posts
      </Link>
      <PostCard post={post} variant={"detail"} />
      <section className="mt-10">
        <PostComments comments={comments} />
      </section>
    </div>
  );
};
