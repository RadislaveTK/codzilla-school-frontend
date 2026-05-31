"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminUsersManager from "../AdminUsersManager/AdminUsersManager";
import styles from "../ProfileStudents/ProfileStudents.module.css";

export default function ProfileUsers() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем пользователей...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Пользователи</h1>
        <p>Родители, администраторы и учителя, которые имеют доступ к системе.</p>
      </div>

      <AdminUsersManager enabled />
    </section>
  );
}
