"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  CircularProgress,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInscription } from "@/hooks/useInscription";
import InscriptionContent from "./InscriptionContent";

export default function InscriptionDetail({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;
  const address = searchParams.get("address");

  const { data, error, isLoading } = useInscription(address, id);

  if (!address) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">
          Missing address. Please navigate from the search page.
        </Typography>
        <Button onClick={() => router.push("/")} sx={{ mt: 2 }}>
          Go to Search
        </Button>
      </Container>
    );
  }

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Container sx={{ py: { xs: 2, sm: 3 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ py: 2, borderBottom: 1, borderColor: "divider" }}
      >
        Details
      </Typography>
      <InscriptionContent id={id} contentType={data?.content_type} />
      <Typography
        variant="h6"
        gutterBottom
        sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}
      >
        Inscription {data?.number}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Inscription ID
      </Typography>
      <Typography variant="body1" sx={{ py: 1, wordBreak: "break-all" }}>
        {data?.id}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Owner Address
      </Typography>
      <Typography variant="body1" sx={{ py: 1, wordBreak: "break-all" }}>
        {data?.address}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 2, py: 1, borderBottom: 1, borderColor: "divider" }}
      >
        Attributes
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Output Value"
            secondary={data?.value ?? "—"}
            secondaryTypographyProps={{ color: "text.secondary", sx: { wordBreak: "break-all" } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Type"
            secondary={data?.content_type || data?.mime_type || "—"}
            secondaryTypographyProps={{ color: "text.secondary", sx: { wordBreak: "break-all" } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Length"
            secondary={data?.content_length ?? "—"}
            secondaryTypographyProps={{ color: "text.secondary", sx: { wordBreak: "break-all" } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Location"
            secondary={data?.location || "—"}
            secondaryTypographyProps={{ color: "text.secondary", sx: { wordBreak: "break-all" } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Transaction"
            secondary={data?.genesis_tx_id || "—"}
            secondaryTypographyProps={{ color: "text.secondary", sx: { wordBreak: "break-all" } }}
          />
        </ListItem>
      </List>
    </Container>
  );
}
