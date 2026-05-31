"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminLessonsManager from "../AdminLessonsManager/AdminLessonsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileAdminLessons() {
  const { user, loading } = useAuth() || {};
  const { t } = useI18n();

  if (loading) {
    return <div className={styles.status}>{t("profile.loadingLessons")}</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>{t("profile.adminOnly")}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{t("profile.sectionAdmin")}</span>
        <h1>{t("profile.lessons")}</h1>
        <p>{t("profile.lessonsDescription")}</p>
      </div>

      <AdminLessonsManager enabled />
    </section>
  );
}
