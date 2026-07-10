import { createApiClient } from "@/shared/api/createApiClient";
import type { PostsResponse } from "@/shared/types/post";

export const postsApi = createApiClient<PostsResponse>({ endpoint: "/posts" });
