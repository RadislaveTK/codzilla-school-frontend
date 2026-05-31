"use client";

import { IconButton } from "@mui/material";
import styles from "./ScrollTopButton.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ScrollTopButton() {
  const { t } = useI18n();
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      className={styles.button}
      aria-label={t("profile.scrollTop")}
      onClick={handleClick}
    >
      <span className={styles.iconSlot} aria-hidden="true" />
    </IconButton>
  );
}
