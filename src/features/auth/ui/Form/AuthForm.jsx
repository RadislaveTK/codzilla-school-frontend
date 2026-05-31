import { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useI18n } from "@/shared/config/i18n";

const styles = {
  toggleGroup: {
    mb: 3,
    backgroundColor: "#ffffff",
    borderRadius: "0",
    p: "4px",
	pb: "16px",
    gap: "4px",
	borderBottom: "1px solid #e0e0e0",
  },
  toggleButton: {
    border: "none",
    borderRadius: "10px !important",
    textTransform: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&.Mui-selected": {
      backgroundColor: "#00AAFF",
      color: "#fff",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#00AAFF",
      opacity: 0.8,
    },
  },
};

export default function AuthForm({ onSuccess }) {
  const { t } = useI18n();
  const [formType, setFormType] = useState("login");

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setFormType(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ToggleButtonGroup
        value={formType}
        exclusive
        onChange={handleChange}
        fullWidth
        sx={styles.toggleGroup}
      >
        <ToggleButton value="login" sx={styles.toggleButton}>
          {t("auth.login")}
        </ToggleButton>

        <ToggleButton value="register" sx={styles.toggleButton}>
          {t("auth.register")}
        </ToggleButton>
      </ToggleButtonGroup>

      <Box>
        {formType === "login" ? (
          <LoginForm onSuccess={onSuccess} />
        ) : (
          <RegisterForm onSuccess={onSuccess} />
        )}
      </Box>
    </Box>
  );
}
