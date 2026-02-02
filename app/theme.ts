"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6200ea",
      dark: "#3700b3"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    },
    text: {
      primary: "#fff",
      secondary: "#999"
    }
  },
  typography: {
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    h5: {
      fontWeight: 700,
      fontSize: "1.4rem"
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem"
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.5
    },
    body2: {
      fontSize: "0.8125rem",
      lineHeight: 1.4
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "sm"
      },
      styleOverrides: {
        root: {
          padding: "16px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            backgroundColor: "#1e1e1e",
            "&:hover": {
              backgroundColor: "#2a2a2a"
            },
            "&.Mui-focused": {
              backgroundColor: "#1e1e1e"
            }
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "4px",
          marginBottom: "8px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#333"
          }
        }
      }
    }
  }
});

export default theme;
