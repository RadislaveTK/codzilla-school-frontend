import { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForm({ onSuccess }) {
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
        sx={{
          mb: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          p: "4px",
        }}
      >
        <ToggleButton
          value="login"
          sx={{
            border: "none",
            borderRadius: "10px !important",
            textTransform: "none",
            fontWeight: 600,
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Вход
        </ToggleButton>

        <ToggleButton
          value="register"
          sx={{
            border: "none",
            borderRadius: "10px !important",
            textTransform: "none",
            fontWeight: 600,
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Регистрация
        </ToggleButton>
      </ToggleButtonGroup>

      <Box>
        {formType === "login" ? <LoginForm onSuccess={onSuccess} /> : <RegisterForm onSuccess={onSuccess} />}
      </Box>
    </Box>
  );
}