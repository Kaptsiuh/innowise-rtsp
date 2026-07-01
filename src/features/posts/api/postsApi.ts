import { createApiClient } from "@/shared/api/createApiClient";
import type { PostsResponse } from "../types/post";

export const postsApi = createApiClient<PostsResponse>({ endpoint: "/posts" });
