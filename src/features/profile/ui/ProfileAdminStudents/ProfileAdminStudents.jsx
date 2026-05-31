"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminStudentsManager from "../AdminStudentsManager/AdminStudentsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileAdminStudents() {
  const { user, loading } = useAuth() || {};
  const { t } = useI18n();

  if (loading) {
    return <div className={styles.status}>{t("profile.loadingStudents")}</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>{t("profile.adminOnly")}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{t("profile.sectionAdmin")}</span>
        <h1>{t("profile.studentsAndGroups")}</h1>
        <p>{t("profile.studentsGroupsDescription")}</p>
      </div>

      <AdminStudentsManager enabled />
    </section>
  );
}
