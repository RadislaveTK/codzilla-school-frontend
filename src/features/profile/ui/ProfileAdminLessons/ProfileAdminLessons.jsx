"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminLessonsManager from "../AdminLessonsManager/AdminLessonsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";

export default function ProfileAdminLessons() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем занятия...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Занятия</h1>
        <p>Планирование уроков для групп, материалы, домашнее задание и кабинет.</p>
      </div>

      <AdminLessonsManager enabled />
    </section>
  );
}
