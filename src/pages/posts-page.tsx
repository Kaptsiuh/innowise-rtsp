import { Posts } from "@/features/posts/ui/Posts";

export const PostsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Posts</h2>
      <Posts />
    </div>
  );
};
