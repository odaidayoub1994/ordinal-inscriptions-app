"use client";

import { useState } from "react";
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
import { Inscription } from "@/types/types";
import { truncateText } from "@/utils/helpers";
import { useOrdinals } from "@/hooks/useOrdinals";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Home() {
  const [address, setAddress] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const router = useRouter();

  const { data, error, isLoading } = useOrdinals(searchAddress);

  const handleSearch = () => {
    const trimmed = address.trim();
    if (trimmed) {
      setSearchAddress(trimmed);
    }
  };

  const handleItemClick = (inscriptionId: string) => {
    router.push(`/inscription/${inscriptionId}?address=${searchAddress}`);
  };

  const inscriptions = data?.results.flatMap((utxo) => utxo.inscriptions) ?? [];
  const hasSearched = !!searchAddress;
  const isEmpty = hasSearched && !isLoading && !error && inscriptions.length === 0;

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
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        fullWidth
        variant="filled"
        className="input"
      />
      <Button
        variant="contained"
        className="button"
        onClick={handleSearch}
        disabled={!address.trim()}
      >
        Look up
      </Button>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Results
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Error loading data</Typography>}
      {isEmpty && (
        <Typography sx={{ mt: 2, color: "#999" }}>
          No inscriptions found for this address.
        </Typography>
      )}
      <List>
        {inscriptions.map((inscription: Inscription) => (
          <ListItem
            key={inscription.id}
            onClick={() => handleItemClick(inscription.id)}
            className="list-item"
          >
            <ListItemText
              primary={`Inscription ${truncateText(inscription.id)}`}
              className="list-item-text"
            />
            <ArrowForwardIosIcon className="list-item-icon" />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
