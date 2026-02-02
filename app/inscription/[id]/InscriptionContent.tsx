"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useInscriptionContent } from "@/hooks/useInscription";
import { CONTENT_BASE_URL } from "@/services/api";

interface InscriptionContentProps {
  id: string;
  contentType: string | undefined;
}

export default function InscriptionContent({
  id,
  contentType
}: InscriptionContentProps) {
  const contentUrl = `${CONTENT_BASE_URL}/${id}`;
  const isText =
    contentType?.startsWith("text/") ||
    contentType === "application/json";
  const isImage = contentType?.startsWith("image/");

  const { data: textContent, isLoading: isTextLoading } =
    useInscriptionContent(id, isText ?? false);

  if (!contentType) return null;

  if (isImage) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contentUrl}
          alt="Inscription content"
          style={{ maxWidth: 250, maxHeight: 250, borderRadius: "8px" }}
        />
      </Box>
    );
  }

  if (isText) {
    if (isTextLoading) return <CircularProgress />;
    return (
      <Box
        sx={{
          mb: 2,
          backgroundColor: "#111",
          borderRadius: "8px",
          padding: "12px",
          overflow: "auto",
          maxHeight: 300
        }}
      >
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "13px"
          }}
        >
          {textContent}
        </pre>
      </Box>
    );
  }

  // Fallback: iframe for video, audio, HTML, and unknown types
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <iframe
        src={contentUrl}
        title="Inscription content"
        sandbox="allow-scripts"
        style={{
          width: 250,
          height: 250,
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#000"
        }}
      />
    </Box>
  );
}
