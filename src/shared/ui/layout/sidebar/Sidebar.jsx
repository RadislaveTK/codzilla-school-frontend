"use client";

import SelectList from "./SelectList";
import { style } from "./SidebarStyle";
import { useI18n } from "@/shared/config/i18n";

export default function Sidebar() {
  const { t } = useI18n();

  return (
    <div className="sidebar" style={style.sidebar}>
      <h2 style={style.title}>{t("profile.title")}</h2>
      <SelectList />
    </div>
  );
}
