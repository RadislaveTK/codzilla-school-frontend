import useFeedback from "@/hooks/useFeedback";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";

export default function CourseForm({ course, onSuccess }) {
  const { loading, sendCourseEnrollment } = useFeedback();
  const [values, setValues] = useState({
    full_name: "",
    phone: "",
    message: "",
    course: course || "",
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
      await sendCourseEnrollment(values);
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
          label="Имя и фамилия"
          type="text"
          name="full_name"
          value={values.full_name}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              full_name: event.target.value,
            }))
          }
          placeholder="Иван Иванов"
          error={!!errors.full_name}
          helperText={errors.full_name}
          fullWidth
          sx={styles.input}
          size="small"
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Номер телефона:</Typography>
        <TextField
          label="Телефон"
          type="tel"
          name="phone"
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              phone: event.target.value,
            }))
          }
          placeholder="8 (777) 123-45-67"
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          sx={styles.input}
          size="small"
        />
      </Box>
      <Box sx={styles.formItem}>
        <Typography sx={styles.label}>Доп. вопросы:</Typography>
        <TextField
          label="Сообщение"
          type="text"
          name="message"
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              message: event.target.value,
            }))
          }
          placeholder="Дополнительная информация или вопросы по курсу"
          error={!!errors.message}
          helperText={errors.message}
          fullWidth
          sx={styles.input}
          size="small"
        />
      </Box>

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
        sx={styles.button}
      >
        {loading ? "Отправляем..." : "Отправить заявку"}
         <Image
          src={"/icons/courses/course/send.svg"}
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
