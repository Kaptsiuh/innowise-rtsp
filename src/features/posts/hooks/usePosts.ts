import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";
import { postsApi } from "../api/postsApi";
import type { Post, PostsResponse } from "@/shared/types/post";

export const usePosts = () => {
  return usePaginatedQuery<PostsResponse, Post>({
    queryKey: ["posts"],
    queryFn: postsApi.getItems,
    selectItems: (data) => data.posts ?? [],
  });
};
