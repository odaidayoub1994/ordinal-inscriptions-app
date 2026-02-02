import { useQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "@/services/api";

export function useOrdinals(address: string) {
  return useQuery({
    queryKey: ["ordinals", address],
    queryFn: () => fetchOrdinals(address),
    enabled: !!address
  });
}
