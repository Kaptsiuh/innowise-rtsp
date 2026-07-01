import type { PaginatedResponse } from "@/shared/types/common";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export interface PostsResponse extends PaginatedResponse<Post> {
  posts: Post[];
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: Pick<User, "id" | "username" | "fullName">;
}

export interface CommentsResponse extends PaginatedResponse<Comment> {
  comments: Comment[];
}

interface User {
  id: number;
  username?: string;
  fullName?: string;
  email?: string;
}

interface Reaction {
  likes: number;
  dislikes: number;
}
