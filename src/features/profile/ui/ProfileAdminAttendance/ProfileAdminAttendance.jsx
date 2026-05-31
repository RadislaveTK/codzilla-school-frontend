"use client";

import { useAuth } from "@/hooks/useAuth";
import AttendanceMarker from "../AttendanceMarker/AttendanceMarker";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";

export default function ProfileAdminAttendance() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем отметку занятия...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Отметка занятия</h1>
        <p>Выберите группу и занятие, отметьте присутствие учеников и сохраните посещаемость.</p>
      </div>

      <AttendanceMarker enabled />
    </section>
  );
}
