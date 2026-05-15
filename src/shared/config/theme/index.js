import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF48F2",
    },
    secondary: {
      main: "#00157d",
    },
    blue: {
      main: "#00AAFF",
    }
  },
  typography: {
    fontFamily: "Exo 2, sans-serif",
    h1: {
      fontSize: "68px",
      fontWeight: "bold",
      color: "#00157d",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#00157d",
    },
    body2: {
      fontSize: "16px",
      fontWeight: "regular",
      color: "#586EDF",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
        },
      },
    },
  },
});
