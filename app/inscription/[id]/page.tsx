"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
import { useState, useEffect } from "react";

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
  const searchParams = useSearchParams();
  const { id } = params;
  const address = searchParams.get("address");

  const { data, error, isLoading } = useQuery({
    queryKey: ["inscription", { address, id }],
    queryFn: () => fetchInscription(address as string, id),
    enabled: !!id && !!address
  });

  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    const validateImage = async () => {
      try {
        const response = await fetch(`https://ord.xverse.app/content/${id}`, {
          method: "HEAD"
        });
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.startsWith("image/")) {
          setIsValidImage(true);
        } else {
          setIsValidImage(false);
        }
      } catch (error) {
        setIsValidImage(false);
      }
    };

    if (data?.content_type.includes("image")) {
      validateImage();
    }
  }, [data, id]);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading data</p>;

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
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          width: "100%",
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px",
          borderBottom: "1px solid #333",
          padding: "16px 0"
        }}
      >
        Details
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {isValidImage ? (
          <Image
            src={`https://ord.xverse.app/content/${id}`}
            alt="Inscription content"
            width={250}
            height={250}
            style={{ borderRadius: "8px" }}
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
          color: "#FFFFFF",
          padding: "8px 0",
          borderBottom: "1px solid #333"
        }}
      >
        Inscription {data?.number}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#FFFFFF",
          padding: "8px 0"
        }}
      >
        Inscription ID {data?.id}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#FFFFFF",
          padding: "8px 0"
        }}
      >
        Owner Address {data?.address}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#FFFFFF",
          padding: "8px 0",
          borderBottom: "1px solid #333"
        }}
      >
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
