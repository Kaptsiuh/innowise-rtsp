import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "@/features/auth/types/auth";
import { authApi } from "@/features/auth/api/authApi";
import { STORAGE_KEYS, tokenStorage } from "../client";

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (token && !user) {
      authApi
        .getMe(token)
        .then((userData) => {
          setUser(userData);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token, user, logout]);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ username, password });
      const {
        accessToken,
        refreshToken: newRefreshToken,
        ...userData
      } = response;
      tokenStorage.setAccess(accessToken);
      if (newRefreshToken) {
        tokenStorage.setRefresh(newRefreshToken);
      }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setToken(accessToken);
      setRefreshToken(newRefreshToken || null);
      setUser(userData);
    } catch (error: unknown) {
      let errorMessage = "Login failed";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object") {
        const err = error as Record<string, unknown>;

        const response = err.response as Record<string, unknown> | undefined;
        const data = response?.data as Record<string, unknown> | undefined;

        if (data?.message && typeof data.message === "string") {
          errorMessage = data.message;
        } else if (data?.error && typeof data.error === "string") {
          errorMessage = data.error;
        } else if (err.message && typeof err.message === "string") {
          errorMessage = err.message;
        }
      }

      throw new Error(errorMessage, { cause: error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    refreshToken,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
