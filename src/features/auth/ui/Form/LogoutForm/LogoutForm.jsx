import { Box, Button } from "@mui/material";
import styles from "./LogoutForm.module.css"

export default function LogoutForm({ onClose }) {
  return (
    <div className={styles.container}>
      <h2>Вы уверены, что хотите выйти?</h2>
      <p>Ваш профиль будет сохранен. Вы сможете войти снова в любое время.</p>
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          sx={{
            // width: "min-content",
            height: "auto",
            padding: "12px 50px",
            color: "#fff",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "500",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
          onClick={onClose}
        >
          Да, выйти
        </Button>
      </Box>
    </div>
  );
}
