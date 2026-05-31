import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/shared/config/i18n";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 8;
}

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const { t } = useI18n();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = { email: "", password: "" };

    if (!values.email) {
      nextErrors.email = t("auth.emailRequired");
    } else if (!validateEmail(values.email)) {
      nextErrors.email = t("auth.emailInvalid");
    }

    if (!values.password) {
      nextErrors.password = t("auth.passwordRequired");
    } else if (!validatePassword(values.password)) {
      nextErrors.password = t("auth.passwordMin");
    }

    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login({ email: values.email, password: values.password });
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      const message =
        error?.errors?.email?.[0] ||
        error?.message ||
        t("auth.loginError");
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{ display: "grid", gap: 2 }}
    >
      <TextField
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            email: event.target.value,
          }))
        }
        placeholder="example@mail.com"
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        sx={{
          transition: "all 0.3s ease",
          "& .MuiFormLabel-root": {
            fontWeight: 500,
          },
          "& .MuiInputBase-input": {
            fontWeight: 500,
          },
        }}
      />
      <TextField
        label={t("auth.password")}
        type="password"
        name="password"
        value={values.password}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            password: event.target.value,
          }))
        }
        placeholder="••••••••"
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        sx={{
          transition: "all 0.3s ease",
          "& .MuiFormLabel-root": {
            fontWeight: 500,
          },
          "& .MuiInputBase-input": {
            fontWeight: 500,
          },
        }}
      />

      {serverError && (
        <Box sx={{ color: "error.main", fontSize: 14, mt: -1 }}>
          {serverError}
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        sx={{
          borderRadius: "12px",
          padding: "8px 20px",
          transition: "all .3s ease",
          color: "#fff",
          "&:hover": {
            opacity: "0.8",
            backgroundColor: "#FF48F2",
          },
        }}
      >
        {loading ? t("auth.signingIn") : t("auth.signIn")}
      </Button>
    </Box>
  );
}
