import { Posts } from "@/features/posts/ui/Posts";

export const PostsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Posts</h1>
      <Posts />
    </div>
  );
};
