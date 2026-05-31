"use client";

import useFeedback from "@/hooks/useFeedback";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/shared/config/i18n";

export default function FeedbackForm({ onSuccess }) {
  const { loading, sendFeedback } = useFeedback();
  const { t } = useI18n();
  const [values, setValues] = useState({
    full_name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    full_name: "",
    phone: "",
    message: "",
  });
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const nextErrors = { full_name: "", phone: "", message: "" };

    if (!values.full_name) {
      nextErrors.full_name = t("forms.fullNameRequired");
    }

    if (!values.phone) {
      nextErrors.phone = t("forms.phoneRequired");
    } else if (!/^\d{10,15}$/.test(values.phone.replace(/\D/g, ""))) {
      nextErrors.phone = t("forms.phoneInvalid");
    }

    setErrors(nextErrors);
    return !nextErrors.full_name && !nextErrors.phone;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      await sendFeedback(values);
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      const message =
        error?.message ||
        t("forms.submitError");
      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={styles.form}>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>{t("forms.parentName")}</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder={t("forms.fullName")}
          label={t("forms.fullName")}
          sx={styles.input}
          type="text"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              full_name: event.target.value,
            }))
          }
          error={!!errors.full_name}
          helperText={errors.full_name}
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>{t("forms.phoneNumber")}:</Typography>
        <TextField
          fullWidth
          size="small"
          sx={styles.input}
          type="tel"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              phone: event.target.value,
            }))
          }
          placeholder="8 (777) 123-45-67"
          label={t("forms.phoneNumber")}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>{t("forms.questions")}</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder={t("forms.questionsShort")}
          label={t("forms.questionsShort")}
          sx={styles.input}
          type="text"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              message: event.target.value,
            }))
          }
          error={!!errors.message}
          helperText={errors.message}
        />
      </Box>
      {serverError && (
        <Box sx={{ color: "error.main", fontSize: 14, mt: -1 }}>
          {serverError}
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? t("forms.sending") : t("forms.callMe")}
        <Image
          src={"/icons/social/phone.svg"}
          alt={t("forms.callMe")}
          width={20}
          height={20}
        />
      </Button>
      <p style={styles.description}>
        {t("forms.agreement")}{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          {t("forms.privacy")}
        </a>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    marginTop: 4,
    maxWidth: 450,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "end",
    gap: { xs: 1, sm: 2 },
    width: "100%",
  },
  label: {
    fontWeight: 400,
    fontSize: "16px",
    whiteSpace: "nowrap",
    color: "#586EDF",
    width: { xs: "100%", sm: "auto" },
  },
  input: {
    width: "100%",
    maxWidth: { xs: "none", sm: "300px" },
    transition: "all 0.3s ease",
    "& .MuiFormLabel-root": {
      fontWeight: 500,
    },
    "& .MuiInputBase-input": {
      fontWeight: 500,
    },
  },
  button: {
    width: { xs: "100%", sm: "min-content" },
    height: "auto",
    backgroundColor: "#FF48F2",
    padding: "16px 20px",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    whiteSpace: { xs: "normal", sm: "nowrap" },
    justifyContent: "center",
  },
  description: {
    color: "#B5C2FF",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "24px",
  },
  link: {
    color: "#586EDF",
    textDecoration: "underline",
  },
};
