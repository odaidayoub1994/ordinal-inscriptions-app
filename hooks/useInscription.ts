import { useQuery } from "@tanstack/react-query";
import { fetchInscription, CONTENT_BASE_URL } from "@/services/api";

export function useInscription(address: string | null, id: string) {
  return useQuery({
    queryKey: ["inscription", { address, id }],
    queryFn: () => fetchInscription(address!, id),
    enabled: !!address && !!id
  });
}

export function useInscriptionContent(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["inscription-content", id],
    queryFn: async () => {
      const response = await fetch(`${CONTENT_BASE_URL}/${id}`);
      return response.text();
    },
    enabled
  });
}
