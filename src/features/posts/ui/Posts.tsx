import { PostList } from "./PostList/PostList";
import { usePosts } from "../hooks/usePosts";
import { PostsPagination } from "./PostsPagination/PostsPagination";

export const Posts = () => {
  const { posts, isLoading, isError, error, pagination } = usePosts();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">Error: {error?.message}</div>
      </div>
    );
  }

  return (
    <>
      <PostList posts={posts} />
      <PostsPagination
        page={pagination.page}
        pages={pagination.pages}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
};
