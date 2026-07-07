import { client } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/post";

export const usePost = (postId: string | number) => {
  const id = Number(postId);
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/posts/{post_id}", {
        params: { path: { post_id: id } },
      });
      if (error) throw new Error("Failed to fetch post");
      return data as Post;
    },
    enabled: !isNaN(id) && id > 0,
  });
};
