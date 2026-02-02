"use client";

import { Suspense, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Inscription } from "@/types/types";
import { truncateText } from "@/utils/helpers";
import { useOrdinals } from "@/hooks/useOrdinals";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchAddress = searchParams.get("address") ?? "";
  const [address, setAddress] = useState(searchAddress);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useOrdinals(searchAddress);

  const handleSearch = () => {
    const trimmed = address.trim();
    if (trimmed) {
      router.push(`/?address=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleItemClick = (inscriptionId: string) => {
    router.push(`/inscription/${inscriptionId}?address=${searchAddress}`);
  };

  const inscriptions =
    data?.pages.flatMap((page) =>
      page.results.flatMap((utxo) => utxo.inscriptions)
    ) ?? [];
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
      {hasNextPage && (
        <Button
          variant="outlined"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          fullWidth
          sx={{ mt: 2, color: "#fff", borderColor: "#555" }}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </Container>
  );
}
