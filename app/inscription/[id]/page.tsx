"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { useInscription, useImageValidation } from "@/hooks/useInscription";
import { CONTENT_BASE_URL } from "@/services/api";
import { SxProps } from "@mui/material/styles";

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
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#FFFFFF",
  padding: "8px 0"
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
  const { data: isValidImage = false } = useImageValidation(
    id,
    data?.content_type
  );

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
    <Container
      sx={{
        position: "relative",
        maxWidth: "375px",
        backgroundColor: "#1A1A1A",
        padding: "16px",
        color: "#fff",
        borderRadius: "8px"
      }}
    >
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {isValidImage ? (
          <Image
            src={`${CONTENT_BASE_URL}/${id}`}
            alt="Inscription content"
            width={250}
            height={250}
            style={{ borderRadius: "8px" }}
          />
        ) : (
          <Typography sx={bodyText}>
            Inscription details not available
          </Typography>
        )}
      </Box>
      <Typography variant="h6" gutterBottom sx={sectionHeading}>
        Inscription {data?.number}
      </Typography>
      <Typography sx={bodyText}>Inscription ID {data?.id}</Typography>
      <Typography sx={bodyText}>Owner Address {data?.address}</Typography>
      <Typography variant="h6" gutterBottom sx={sectionHeading}>
        Attributes
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Output Value"
            secondary={data?.value}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Type"
            secondary={data?.mime_type}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Content Length"
            secondary={data?.content_length}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Location"
            secondary={data?.location}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Transaction"
            secondary={data?.genesis_tx_id}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
      </List>
    </Container>
  );
}
