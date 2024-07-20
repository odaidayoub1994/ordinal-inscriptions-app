export interface Inscription {
  id: string;
  number: number;
  address: string;
  genesis_address: string;
  genesis_block_height: number;
  genesis_block_hash: string;
  genesis_tx_id: string;
  genesis_fee: number;
  genesis_timestamp: number;
  location: string;
  output: string;
  offset: number;
  sat_ordinal: number;
  sat_rarity: string;
  sat_coinbase_height: number;
  mime_type: string;
  content_type: string;
  content_length: number;
  tx_id: string;
  timestamp: number;
  value: number;
}

export interface UTXO {
  txid: string;
  vout: number;
  block_height: number;
  value: number;
  sats: Array<{
    number: string;
    rarity_ranking: string;
    offset: number;
  }>;
  inscriptions: Inscription[];
}

export interface OrdinalsResponse {
  limit: number;
  offset: number;
  total: number;
  results: UTXO[];
}
