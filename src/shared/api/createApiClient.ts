import { client } from "./client";
import type { paths } from "./schema";

type GetEndpoints = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof paths]: paths[K] extends { get: any } ? K : never;
}[keyof paths];

interface ApiClientOptions {
  endpoint: GetEndpoints;
  itemsPerPage?: number;
}

export const createApiClient = <T>({
  endpoint,
  itemsPerPage = 10,
}: ApiClientOptions) => {
  return {
    getItems: async (page: number, signal?: AbortSignal): Promise<T> => {
      try {
        const skip = (page - 1) * itemsPerPage;
        const response = await client.GET(endpoint, {
          params: {
            query: {
              limit: itemsPerPage,
              skip,
            },
          },
          signal,
        });

        return response.data as T;
      } catch (error) {
        throw new Error(`API Error (${endpoint}):`, error);
      }
    },
  };
};
