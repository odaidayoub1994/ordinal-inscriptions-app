"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Container
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Inscription, OrdinalsResponse } from "@/types/types";
import HELPERS from "@/utils/helpers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const fetchOrdinals = async (address: string): Promise<OrdinalsResponse> => {
  const { data } = await axios.get<OrdinalsResponse>(
    `https://api-3.xverse.app/v1/address/${address}/ordinal-utxo`
  );

  return data;
};

export default function Home() {
  const [address, setAddress] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const router = useRouter();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["ordinals", inputAddress],
    queryFn: () => fetchOrdinals(inputAddress),
    enabled: false
  });

  useEffect(() => {
    if (inputAddress) {
      refetch();
    }
  }, [inputAddress, refetch]);

  const handleSearch = () => {
    setInputAddress(address);
  };

  const handleItemClick = (inscriptionId: string) => {
    router.push(`/inscription/${inscriptionId}?address=${address}`);
  };

  return (
    <Container className="container">
      <Typography variant="h5" align="center" gutterBottom>
        Ordinal Inscription Lookup
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Owner Bitcoin Address:
      </Typography>
      <TextField
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        variant="filled"
        className="input"
      />
      <Button variant="contained" className="button" onClick={handleSearch}>
        Look up
      </Button>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Results
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <p>Error loading data</p>}
      <List>
        {data?.results.flatMap((utxo) =>
          utxo.inscriptions.map((inscription: Inscription) => (
            <ListItem
              key={inscription.id}
              onClick={() => handleItemClick(inscription.id)}
              className="list-item"
            >
              <ListItemText
                primary={`Inscription ${HELPERS.textPipe(inscription.id)}`}
                className="list-item-text"
              />
              <ArrowForwardIosIcon className="list-item-icon" />
            </ListItem>
          ))
        )}
      </List>
      {/* Add Load More Button for pagination */}
    </Container>
  );
}
