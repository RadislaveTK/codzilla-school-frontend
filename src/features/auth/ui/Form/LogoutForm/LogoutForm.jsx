import { Box, Button } from "@mui/material";
import styles from "./LogoutForm.module.css"
import { useI18n } from "@/shared/config/i18n";

export default function LogoutForm({ onClose }) {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <h2>{t("profile.logoutTitle")}</h2>
      <p>{t("profile.logoutDescription")}</p>
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
          {t("profile.logoutConfirm")}
        </Button>
      </Box>
    </div>
  );
}
