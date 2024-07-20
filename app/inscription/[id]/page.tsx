"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
import { Inscription } from "@/types/types";

const fetchInscription = async (
  address: string,
  id: string
): Promise<Inscription> => {
  const { data } = await axios.get(
    `https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${id}`
  );

  return data;
};

export default function InscriptionDetail({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;
  const address =
    "bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs"; // Replace with dynamic address if needed

  const { data, error, isLoading } = useQuery({
    queryKey: ["inscription", { address, id }],
    queryFn: () => fetchInscription(address, id),
    enabled: !!id && !!address
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading data</p>;

  const contentUrl = `https://ord.xverse.app/content/${id}`;

  return (
    <Container
      sx={{
        position: "relative",
        width: "375px",
        height: "1198px",
        backgroundColor: "#1A1A1A",
        padding: "16px"
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ color: "#fff", mb: 2 }}
      >
        Back
      </Button>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          width: "100%",
          height: "88px",
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px"
        }}
      >
        Details
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {data?.content_type.includes("image") ? (
          <Image
            src={contentUrl}
            alt="Inscription content"
            width={500}
            height={500}
          />
        ) : (
          <Typography
            sx={{ fontFamily: "Montserrat, sans-serif", color: "#FFFFFF" }}
          >
            Inscription details not available
          </Typography>
        )}
      </Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#FFFFFF"
        }}
      >
        Inscription {data?.id}
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Content Type"
            secondary={data?.content_type}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Offset"
            secondary={data?.offset}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Address"
            secondary={data?.address}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Address"
            secondary={data?.genesis_address}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Block Height"
            secondary={data?.genesis_block_height}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Block Hash"
            secondary={data?.genesis_block_hash}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Transaction ID"
            secondary={data?.genesis_tx_id}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Fee"
            secondary={data?.genesis_fee}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Genesis Timestamp"
            secondary={
              data?.genesis_timestamp
                ? new Date(data.genesis_timestamp).toLocaleString()
                : "N/A"
            }
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
            primary="Output"
            secondary={data?.output}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sat Ordinal"
            secondary={data?.sat_ordinal}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sat Rarity"
            secondary={data?.sat_rarity}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sat Coinbase Height"
            secondary={data?.sat_coinbase_height}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="MIME Type"
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
            primary="Transaction ID"
            secondary={data?.tx_id}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Timestamp"
            secondary={
              data?.timestamp
                ? new Date(data.timestamp).toLocaleString()
                : "N/A"
            }
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Value"
            secondary={data?.value}
            sx={{ color: "#FFFFFF" }}
          />
        </ListItem>
      </List>
    </Container>
  );
}
