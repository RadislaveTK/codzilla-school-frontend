"use client";

import { useAuth } from "@/hooks/useAuth";
import AttendanceMarker from "../AttendanceMarker/AttendanceMarker";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileAdminAttendance() {
  const { user, loading } = useAuth() || {};
  const { t } = useI18n();

  if (loading) {
    return <div className={styles.status}>{t("profile.loadingAttendance")}</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>{t("profile.adminOnly")}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{t("profile.sectionAdmin")}</span>
        <h1>{t("profile.attendanceMarker")}</h1>
        <p>{t("profile.attendanceMarkerDescription")}</p>
      </div>

      <AttendanceMarker enabled />
    </section>
  );
}
