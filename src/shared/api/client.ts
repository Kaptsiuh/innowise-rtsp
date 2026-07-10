import createClient from "openapi-fetch";
import type { paths } from "./schema";

type QueuedRequest = {
  resolve: (value: Promise<Response>) => void;
  reject: (reason?: unknown) => void;
  request: Request;
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_token",
  REFRESH_TOKEN: "auth_refresh_token",
  USER: "auth_user",
} as const;

export const tokenStorage = {
  getAccess: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefresh: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  setAccess: (token: string) =>
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  setRefresh: (token: string) =>
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

const requestQueue = {
  _queue: [] as QueuedRequest[],
  _isProcessing: false,
  add(request: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      this._queue.push({ resolve, reject, request });
    });
  },
  flush(token: string | null): void {
    const queue = this._queue;
    this._queue = [];
    queue.forEach(({ resolve, reject, request }) => {
      if (!token) {
        reject(new Error("Token refresh failed"));
        return;
      }
      const newRequest = request.clone();
      newRequest.headers.set("Authorization", `Bearer ${token}`);
      resolve(fetch(newRequest));
    });
  },
  clear(): void {
    this._queue = [];
    this._isProcessing = false;
  },
  get isProcessing() {
    return this._isProcessing;
  },
  set isProcessing(value: boolean) {
    this._isProcessing = value;
  },
};

export const client = createClient<paths>({
  baseUrl: "https://dummyjson.com/",
  headers: {},
});

client.use({
  async onRequest({ request }) {
    const token = tokenStorage.getAccess();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
});

async function refreshTokens(): Promise<{
  accessToken: string;
  refreshToken?: string;
} | null> {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) {
    return null;
  }

  try {
    const { data, error } = await client.POST("/auth/refresh", {
      body: { refreshToken },
    });
    if (error || !data) {
      throw new Error("Refresh failed");
    }
    const { accessToken, refreshToken: newRefreshToken } = data;
    if (!accessToken) {
      throw new Error("No access token in refresh response");
    }
    tokenStorage.setAccess(accessToken);
    if (newRefreshToken) {
      tokenStorage.setRefresh(newRefreshToken);
    }
    return { accessToken, refreshToken: newRefreshToken || refreshToken };
  } catch (err) {
    console.error("Refresh error:", err);
    tokenStorage.clear();
    window.location.href = "/login";
    return null;
  }
}

async function retryRequest(
  request: Request,
  token: string,
): Promise<Response> {
  const newRequest = new Request(request.url, {
    method: request.method,
    headers: new Headers(request.headers),
    body: request.body,
  });
  newRequest.headers.set("Authorization", `Bearer ${token}`);
  return fetch(newRequest);
}

client.use({
  async onResponse({ response, request }) {
    if (request.url.includes("/auth/refresh") || response.status !== 401) {
      return response;
    }
    if (requestQueue.isProcessing) {
      return requestQueue.add(request);
    }
    requestQueue.isProcessing = true;

    try {
      const tokens = await refreshTokens();
      if (!tokens) {
        return response;
      }
      requestQueue.flush(tokens.accessToken);
      return retryRequest(request, tokens.accessToken);
    } finally {
      requestQueue.isProcessing = false;
    }
  },
});
