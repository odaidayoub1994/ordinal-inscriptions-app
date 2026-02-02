"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Container,
  Box,
  Pagination,
  Button
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Inscription } from "@/types/types";
import { truncateText } from "@/utils/helpers";
import { useOrdinals } from "@/hooks/useOrdinals";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PAGE_SIZE = 8;

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
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useOrdinals(searchAddress);

  // Fetch all UTXO pages so we have the complete inscription list
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    setPage(1);
  }, [searchAddress]);

  const handleSearch = () => {
    const trimmed = address.trim();
    if (trimmed) {
      router.push(`/?address=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleItemClick = (inscriptionId: string) => {
    router.push(`/inscription/${inscriptionId}?address=${searchAddress}`);
  };

  const allInscriptions = useMemo(
    () =>
      data?.pages.flatMap((p) =>
        p.results.flatMap((utxo) => utxo.inscriptions)
      ) ?? [],
    [data]
  );

  const totalPages = Math.ceil(allInscriptions.length / PAGE_SIZE);
  const paginatedInscriptions = allInscriptions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const hasSearched = !!searchAddress;
  const stillFetching = isLoading || isFetchingNextPage;
  const isEmpty =
    hasSearched && !stillFetching && !error && allInscriptions.length === 0;

  return (
    <Container sx={{ py: { xs: 2, sm: 3 } }}>
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
        placeholder="Enter a Bitcoin address"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={!address.trim()}
        fullWidth
        sx={{ mt: 1 }}
      >
        Look up
      </Button>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Results
      </Typography>
      {stillFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">Error loading data</Typography>}
      {isEmpty && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No inscriptions found for this address.
        </Typography>
      )}
      <List>
        {paginatedInscriptions.map((inscription: Inscription) => (
          <ListItem
            key={inscription.id}
            onClick={() => handleItemClick(inscription.id)}
          >
            <ListItemText
              primary={`Inscription ${truncateText(inscription.id)}`}
            />
            <ArrowForwardIosIcon sx={{ ml: 1 }} fontSize="small" />
          </ListItem>
        ))}
      </List>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
