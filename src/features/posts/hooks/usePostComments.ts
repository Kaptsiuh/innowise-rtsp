import { client } from "@/shared/api/client";
import type { CommentsResponse } from "@/shared/types/post";
import { useQuery } from "@tanstack/react-query";

export const usePostComments = (postId: string | number) => {
  const id = Number(postId);
  return useQuery({
    queryKey: ["post-comments", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/posts/{post_id}/comments", {
        params: { path: { post_id: id } },
      });
      if (error) throw new Error("Failed to fetch comments");
      return data as CommentsResponse;
    },
    enabled: !isNaN(id) && id > 0,
  });
};
