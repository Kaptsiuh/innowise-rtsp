import { PostList } from "./PostList/PostList";
import { usePosts } from "../hooks/usePosts";
import { ItemsPagination } from "@/shared/components";

export const Posts = () => {
  const { items, isLoading, isError, error, pagination } = usePosts();

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
      <PostList posts={items} />
      <ItemsPagination
        page={pagination.page}
        pages={pagination.pages}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
};
