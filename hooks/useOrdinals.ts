import { useQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "@/services/api";

export function useOrdinals(address: string, offset: number) {
  return useQuery({
    queryKey: ["ordinals", address, offset],
    queryFn: () => fetchOrdinals(address, offset),
    enabled: !!address,
  });
}
