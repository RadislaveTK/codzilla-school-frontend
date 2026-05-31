"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminGroupsManager from "../AdminGroupsManager/AdminGroupsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileAdminGroups() {
  const { user, loading } = useAuth() || {};
  const { t } = useI18n();

  if (loading) {
    return <div className={styles.status}>{t("profile.loadingGroups")}</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>{t("profile.adminOnly")}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{t("profile.sectionAdmin")}</span>
        <h1>{t("profile.groups")}</h1>
        <p>{t("profile.streamsDescription")}</p>
      </div>

      <AdminGroupsManager enabled />
    </section>
  );
}
