"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminGroupsManager from "../AdminGroupsManager/AdminGroupsManager";
import styles from "../ProfileAdmin/ProfileAdmin.module.css";

export default function ProfileAdminGroups() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем группы...</div>;
  }

  if (user?.role !== "admin") {
    return <div className={styles.status}>Раздел доступен только администратору.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Группы</h1>
        <p>Управление группами: курс, вместимость, статус и описание потока.</p>
      </div>

      <AdminGroupsManager enabled />
    </section>
  );
}
