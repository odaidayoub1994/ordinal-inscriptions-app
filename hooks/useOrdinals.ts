import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "@/services/api";

export function useOrdinals(address: string) {
  return useInfiniteQuery({
    queryKey: ["ordinals", address],
    queryFn: ({ pageParam = 0 }) => fetchOrdinals(address, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    enabled: !!address
  });
}
