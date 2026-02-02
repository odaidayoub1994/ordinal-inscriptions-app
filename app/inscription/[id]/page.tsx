"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  CircularProgress,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInscription } from "@/hooks/useInscription";
import { SxProps } from "@mui/material/styles";
import InscriptionContent from "./InscriptionContent";

const sectionHeading: SxProps = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#FFFFFF",
  padding: "8px 0",
  borderBottom: "1px solid #333"
};

const bodyText: SxProps = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#FFFFFF",
  padding: "8px 0",
  wordBreak: "break-all"
};

const labelText: SxProps = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "13px",
  color: "#999",
  marginBottom: "2px"
};

const secondarySx: SxProps = {
  "& .MuiListItemText-secondary": {
    color: "#aaa",
    wordBreak: "break-all"
  }
};

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
      <Container sx={{ padding: "32px", textAlign: "center" }}>
        <Typography color="error">
          Missing address. Please navigate from the search page.
        </Typography>
        <Button onClick={() => router.push("/")} sx={{ color: "#fff", mt: 2 }}>
          Go to Search
        </Button>
      </Container>
    );
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Container className="container">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ color: "#fff", mb: 2 }}
      >
        Back
      </Button>
      <Typography variant="h5" align="center" gutterBottom sx={{ ...sectionHeading as object, padding: "16px 0" }}>
        Details
      </Typography>
      <InscriptionContent id={id} contentType={data?.content_type} />
      <Typography variant="h6" gutterBottom sx={sectionHeading}>
        Inscription {data?.number}
      </Typography>
      <Typography sx={labelText}>Inscription ID</Typography>
      <Typography sx={bodyText}>{data?.id}</Typography>
      <Typography sx={labelText}>Owner Address</Typography>
      <Typography sx={bodyText}>{data?.address}</Typography>
      <Typography variant="h6" gutterBottom sx={{ ...sectionHeading as object, mt: 2 }}>
        Attributes
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Output Value"
            secondary={data?.value ?? "—"}
            sx={secondarySx}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Type"
            secondary={data?.content_type || data?.mime_type || "—"}
            sx={secondarySx}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Length"
            secondary={data?.content_length ?? "—"}
            sx={secondarySx}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Location"
            secondary={data?.location || "—"}
            sx={secondarySx}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Transaction"
            secondary={data?.genesis_tx_id || "—"}
            sx={secondarySx}
          />
        </ListItem>
      </List>
    </Container>
  );
}
