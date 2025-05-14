import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useApi = <TResult>(
  options: RequestInit & { url: string } = { url: "" },
  cacheKey: unknown[] = [options.url],
  queryOption?: Omit<
    UseQueryOptions<TResult, Error, TResult, unknown[]>,
    "queryKey" | "queryFn"
  >
): { error?: Error; isLoading: boolean; data?: TResult } => {
  const fetchData = async () => {
    const res = await fetch(options.url, {
      ...options,
      headers: {
        ...options.headers,
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      const error = await res.json();
      throw error;
    } else {
      const data = await res.json();
      return data;
    }
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
//   fetchOptions: RequestInit & { url: string },
//   cacheKey?: unknown[],
//   queryOptions?: UseMutationOptions<TResult, Error, TVars>
// ) => {
//   const fetchData = async (body: TVars): Promise<TResult> => {
//     const res = await fetch(fetchOptions.url, {
//       ...fetchOptions,
//       headers: {
//         ...fetchOptions.headers,
//       },
//       body: body != null ? JSON.stringify(body) : undefined,
//     });

//     if (!res.ok) {
//       const error = await res.json();
//       throw error;
//     }

//     const data = await res.json();
//     return data as Promise<TResult>;
//   };

//   const queryClient = useQueryClient();

//   if (!cacheKey) {
//     cacheKey = [fetchOptions.url];
//   }

//   const { mutateAsync, isPending, error, data } = useMutation<
//     TResult,
//     Error,
//     TVars
//   >({
//     mutationFn: fetchData,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: cacheKey });
//     },
//     ...queryOptions,
//   });

//   return { mutateAsync, isPending, error, data };
// };
