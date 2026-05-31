"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminStudentsManager from "../AdminStudentsManager/AdminStudentsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";

export default function ProfileAdminStudents() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем учеников...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Ученики и группы</h1>
        <p>Создание ученика с привязкой к родителю, курсу и учебной группе.</p>
      </div>

      <AdminStudentsManager enabled />
    </section>
  );
}
