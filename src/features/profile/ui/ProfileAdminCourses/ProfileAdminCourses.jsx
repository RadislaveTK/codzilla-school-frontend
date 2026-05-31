"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminCoursesManager from "../AdminCoursesManager/AdminCoursesManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";

export default function ProfileAdminCourses() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем курсы...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Курсы</h1>
        <p>Создание и редактирование программ обучения, цен, навыков и статуса активности.</p>
      </div>

      <AdminCoursesManager enabled />
    </section>
  );
}
