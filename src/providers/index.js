"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/shared/config/theme";
import { AuthProvider } from "@/features/auth/model/AuthProvider";
import { Provider as BusProvider } from "react-bus";

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <BusProvider>
        <AuthProvider>{children}</AuthProvider>
      </BusProvider>
    </ThemeProvider>
  );
}
