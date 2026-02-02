import axios from "axios";
import { Inscription, OrdinalsResponse } from "@/types/types";

const API_BASE_URL = "https://api-3.xverse.app/v1";
export const CONTENT_BASE_URL = "https://ord.xverse.app/content";

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

export const fetchOrdinals = async (
  address: string,
  offset: number = 0
): Promise<OrdinalsResponse> => {
  const { data } = await apiClient.get<OrdinalsResponse>(
    `/address/${address}/ordinal-utxo`,
    { params: { offset } }
  );
  return data;
};

export const fetchInscription = async (
  address: string,
  id: string
): Promise<Inscription> => {
  const { data } = await apiClient.get<Inscription>(
    `/address/${address}/ordinals/inscriptions/${id}`
  );
  return data;
};
