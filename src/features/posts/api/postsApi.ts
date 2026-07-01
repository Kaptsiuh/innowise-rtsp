import { client } from "@/shared/api/client";

const ITEMS_PER_PAGE = 10;

export const postsApi = {
  getPosts: async (page: number, signal?: AbortSignal) => {
    try {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const response = await client.GET(`/posts`, {
        params: {
          query: {
            limit: ITEMS_PER_PAGE,
            skip,
          },
        },
        signal,
      });

      return response.data;
    } catch (error) {
      throw new Error("API Error:", error);
    }
  },
};
