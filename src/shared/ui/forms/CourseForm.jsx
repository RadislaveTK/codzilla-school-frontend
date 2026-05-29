import useFeedback from "@/hooks/useFeedback";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";


export default function CourseForm({ course, onSuccess }) {
  const { loading, sendCourseEnrollment } = useFeedback();
  const [values, setValues] = useState({
    full_name: "",
    phone: "",
    message: "",
    course: course || ""
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{ display: "grid", gap: 2 }}
    >
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
        {loading ? "Отправляем..." : "Отправить заявку"}
      </Button>
    </Box>
  );
}
