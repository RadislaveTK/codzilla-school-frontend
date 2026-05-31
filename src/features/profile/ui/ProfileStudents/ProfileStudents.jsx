"use client";

import {
  getStudentCourseTitle,
  getStudentGroups,
  getStudentStatusLabel,
} from "../../model/normalizers";
import { useProfileStudents } from "../../model/useProfileStudents";
import styles from "./ProfileStudents.module.css";

export default function ProfileStudents() {
  const { authLoading, user, loading, error, students, stats } =
    useProfileStudents();

  if (loading || authLoading) {
    return <div className={styles.status}>Загружаем учеников...</div>;
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? "Все группы" : "Мои дети"}</span>
        <h1>Ученики</h1>
        <p>
          {user?.role === "admin"
            ? "Список учеников, которые закреплены за доступными группами."
            : "Карточки детей, подключенных к вашему аккаунту."}
        </p>
      </div>

      <div className={styles.statsGrid}>
        <article>
          <span>Всего</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>Активных</span>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <span>Выпускников</span>
          <strong>{stats.graduated}</strong>
        </article>
        <article>
          <span>М / Ж</span>
          <strong>
            {stats.male}/{stats.female}
          </strong>
        </article>
      </div>

      <div className={styles.cards}>
        {students.length ? (
          students.map((student) => {
            const groups = getStudentGroups(student);

            return (
              <article className={styles.card} key={student.id}>
                <div className={styles.avatar}>
                  {student.full_name?.slice(0, 1) || "У"}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div>
                      <h2>{student.full_name}</h2>
                      <span>
                        {student.age ? `${student.age} лет` : "Возраст не указан"}
                      </span>
                    </div>
                    <mark>{getStudentStatusLabel(student)}</mark>
                  </div>

                  <div className={styles.details}>
                    <span>
                      Курс:{" "}
                      {getStudentCourseTitle(student)}
                    </span>
                    <span>
                      Группы:{" "}
                      {groups.length
                        ? groups.map((group) => group.name).join(", ")
                        : "нет групп"}
                    </span>
                    {user?.role === "admin" && student.parent ? (
                      <span>Родитель: {student.parent.name}</span>
                    ) : null}
                    <span>
                      Прогресс: {student.current_progress_percent || 0}%
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className={styles.empty}>Ученики пока не найдены.</div>
        )}
      </div>
    </section>
  );
}
