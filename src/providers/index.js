"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/shared/config/theme";
import { AuthProvider } from "@/features/auth/model/AuthProvider";
import { Provider as BusProvider } from "react-bus";
import { I18nProvider } from "@/shared/config/i18n";

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <I18nProvider>
        <BusProvider>
          <AuthProvider>{children}</AuthProvider>
        </BusProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
