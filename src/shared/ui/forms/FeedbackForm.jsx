"use client";

import useFeedback from "@/hooks/useFeedback";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function FeedbackForm({ onSuccess }) {
  const { loading, sendFeedback } = useFeedback();
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
      nextErrors.full_name = "Имя и фамилия обязательны";
    }

    if (!values.phone) {
      nextErrors.phone = "Телефон обязателен";
    } else if (!/^\d{10,15}$/.test(values.phone.replace(/\D/g, ""))) {
      nextErrors.phone = "Некорректный телефон";
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
        "Ошибка отправки. Проверьте данные и попробуйте снова.";
      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={styles.form}>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Имя родителя:</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Имя и фамилия"
          label="Имя и фамилия"
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
        <Typography sx={styles.label}>Номер телефона:</Typography>
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
          label="Номер телефона"
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Доп. вопросы:</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Доп. вопросы"
          label="Доп. вопросы"
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
        {loading ? "Отправляем..." : "Перезвоните мне"}
        <Image
          src={"/icons/social/phone.svg"}
          alt="Перезвоните мне"
          width={20}
          height={20}
        />
      </Button>
      <p style={styles.description}>
        Нажимая на кнопку, вы соглашаетесь с{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          политикой конфиденциальности
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
    flexDirection: "row",
    justifyContent: "end",
    gap: 2,
    width: "100%",
  },
  label: {
    fontWeight: 400,
    fontSize: "16px",
    whiteSpace: "nowrap",
    color: "#586EDF",
  },
  input: {
    width: "100%",
    maxWidth: "300px",
    transition: "all 0.3s ease",
    "& .MuiFormLabel-root": {
      fontWeight: 500,
    },
    "& .MuiInputBase-input": {
      fontWeight: 500,
    },
  },
  button: {
    width: "min-content",
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
    whiteSpace: "nowrap",
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
