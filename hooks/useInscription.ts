import { useQuery } from "@tanstack/react-query";
import { fetchInscription } from "@/services/api";
import { CONTENT_BASE_URL } from "@/services/api";

export function useInscription(address: string | null, id: string) {
  return useQuery({
    queryKey: ["inscription", { address, id }],
    queryFn: () => fetchInscription(address!, id),
    enabled: !!address && !!id
  });
}

export function useImageValidation(id: string, contentType: string | undefined) {
  return useQuery({
    queryKey: ["image-validation", id],
    queryFn: async () => {
      const response = await fetch(`${CONTENT_BASE_URL}/${id}`, {
        method: "HEAD"
      });
      const type = response.headers.get("content-type");
      return !!type && type.startsWith("image/");
    },
    enabled: !!contentType && contentType.includes("image")
  });
}
