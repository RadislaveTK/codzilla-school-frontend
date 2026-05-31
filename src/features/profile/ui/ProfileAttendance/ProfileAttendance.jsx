"use client";

import { useProfileAttendance } from "../../model/useProfileAttendance";
import styles from "./ProfileAttendance.module.css";

export default function ProfileAttendance() {
  const {
    authLoading,
    user,
    loading,
    error,
    groups,
    children,
    students,
    selectedGroupId,
    selectedStudentId,
    setSelectedGroupId,
    setSelectedStudentId,
    records,
    stats,
  } = useProfileAttendance();

  if (loading || authLoading) {
    return <div className={styles.status}>Загружаем посещаемость...</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? "Группы и ученики" : "Мои дети"}</span>
        <h1>Посещаемость</h1>
        <p>История занятий, пропусков и опозданий по доступным ученикам.</p>
      </div>

      {error ? <div className={styles.status}>{error}</div> : null}

      <div className={styles.controls}>
        {user?.role === "admin" ? (
          <label>
            Группа
            <select
              value={selectedGroupId}
              onChange={(event) => setSelectedGroupId(event.target.value)}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name} - {group.course?.name || "курс"}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label>
          Ученик
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
          >
            {(user?.role === "admin" ? students : children).map((student) => (
              <option key={student.id} value={student.id}>
                {student.full_name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.statsGrid}>
        <article>
          <span>Всего</span>
          <strong>{stats.total || records.length || 0}</strong>
        </article>
        <article>
          <span>Присутствий</span>
          <strong>{stats.present || 0}</strong>
        </article>
        <article>
          <span>Пропусков</span>
          <strong>{stats.absent || 0}</strong>
        </article>
        <article>
          <span>Опозданий</span>
          <strong>{stats.late || 0}</strong>
        </article>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Дата</span>
          <span>Занятие</span>
          <span>Группа</span>
          <span>Статус</span>
        </div>

        {records.length ? (
          records.map((record, index) => (
            <div className={styles.tableRow} key={`${record.date}-${index}`}>
              <span>{record.date || "Дата не указана"}</span>
              <strong>{record.lesson || "Занятие"}</strong>
              <span>{record.group || "Без группы"}</span>
              <mark>{record.status || "Не отмечено"}</mark>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Записей о посещаемости пока нет.</div>
        )}
      </div>
    </section>
  );
}
