import { Posts } from "@/features/posts/ui/Posts";
import { Helmet } from "react-helmet-async";

export const PostsPage = () => {
  return (
    <>
      <Helmet>
        <title>Posts - Innowise RTSP</title>
        <meta name="description" content="Browse our posts." />
        <meta property="og:title" content="Posts - Innowise RTSP" />
        <meta property="og:description" content="Browse our posts." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Posts</h1>
        <Posts />
      </div>
    </>
  );
};
