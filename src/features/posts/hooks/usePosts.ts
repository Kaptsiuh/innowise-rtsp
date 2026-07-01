import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";
import type { Post, PostsResponse } from "../types/post";
import { postsApi } from "../api/postsApi";

export const usePosts = () => {
  return usePaginatedQuery<PostsResponse, Post>({
    queryKey: ["posts"],
    queryFn: postsApi.getItems,
    selectItems: (data) => data.posts ?? [],
  });
};
