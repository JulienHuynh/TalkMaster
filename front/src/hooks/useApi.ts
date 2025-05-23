import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useApi = <TResult>(
  options: RequestInit & { url: string } = { url: "" },
  cacheKey: unknown[] = [options.url],
  queryOption?: Omit<
    UseQueryOptions<TResult, Error, TResult, unknown[]>,
    "queryKey" | "queryFn"
  >,
): { error?: Error; isLoading: boolean; data?: TResult } => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const fetchData = async () => {
    const res = await fetch(options.url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      const error = await res.json();
      throw error;
    }

    const data = await res.json();
    return data;
  };

  const { isLoading, data, error } = useQuery<
    TResult,
    Error,
    TResult,
    unknown[]
  >({
    queryKey: cacheKey,
    queryFn: fetchData,
    ...queryOption,
  });

  return { error: error || undefined, isLoading, data };
};
