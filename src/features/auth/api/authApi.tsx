import { client } from "@/shared/api/client";
import type {
  AuthResponse,
  LoginCredentials,
  Tokens,
  User,
} from "../types/auth";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data, error } = await client.POST("/auth/login", {
      body: credentials,
    });
    if (error) throw new Error(error || "Login failed");
    return data as AuthResponse;
  },

  getMe: async (token: string): Promise<User> => {
    const { data, error } = await client.GET("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (error) throw new Error(error || "Failed to fetch user");
    return data as User;
  },

  refresh: async (refreshToken: string): Promise<Tokens> => {
    const { data, error } = await client.POST("/auth/refresh", {
      body: { refreshToken },
    });
    if (error) throw new Error(error || "Refresh failed");
    return data as Tokens;
  },
};
