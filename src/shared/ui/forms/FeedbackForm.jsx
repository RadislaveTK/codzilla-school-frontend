"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { color } from "framer-motion";
import { label } from "framer-motion/client";
import Image from "next/image";

export default function FeedbackForm({ onSuccess }) {
  return (
    <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   onSuccess();
      // }}
      autoComplete="off"
      style={styles.form}
    >
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Имя родителя:</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Имя и фамилия"
          sx={styles.input}
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Номер телефона:</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Номер телефона"
          sx={styles.input}
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Доп. вопросы:</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Доп. вопросы"
          sx={styles.input}
        />
      </Box>
      <Button variant="contained" color="primary" sx={styles.button}>
        Перезвоните мне
        <Image
          src={"/icons/social/phone.svg"}
          alt="Перезвоните мне"
          width={20}
          height={20}
        />
      </Button>
      <p style={styles.description}>Нажимая на кнопку, вы соглашаетесь с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={styles.link}>политикой конфиденциальности</a></p>
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
