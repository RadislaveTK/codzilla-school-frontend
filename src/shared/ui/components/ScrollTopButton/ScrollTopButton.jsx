"use client";

import { IconButton } from "@mui/material";
import styles from "./ScrollTopButton.module.css";

export default function ScrollTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      className={styles.button}
      aria-label="Наверх"
      onClick={handleClick}
    >
      <span className={styles.iconSlot} aria-hidden="true" />
    </IconButton>
  );
}
