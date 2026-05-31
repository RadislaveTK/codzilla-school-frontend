"use client";

/* eslint-disable @next/next/no-img-element */

import { useBus } from "react-bus";
import {
  getCourseGroupsCount,
  getCourseTitle,
} from "../../model/normalizers";
import { useProfileCourses } from "../../model/useProfileCourses";
import AdminCoursesManager from "../AdminCoursesManager/AdminCoursesManager";
import styles from "./ProfileCourses.module.css";

export default function ProfileCourses() {
  const { authLoading, user, loading, error, items, stats } =
    useProfileCourses();
  const bus = useBus();

  const openCourseApplication = (course) => {
    bus.emit("feedbackModal:open", {
      title: "Запись на курс",
      type: "course",
      course: getCourseTitle(course),
    });
  };

  if (loading || authLoading) {
    return <div className={styles.status}>Загружаем курсы...</div>;
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? "Администрирование" : "Обучение"}</span>
        <h1>Курсы</h1>
        <p>
          {user?.role === "admin"
            ? "Список курсов, наполненность групп и основные параметры программ."
            : "Курсы, на которых сейчас учатся ваши дети."}
        </p>
      </div>

      <div className={styles.statsGrid}>
        <article>
          <span>Всего курсов</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>Активных</span>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <span>Групп</span>
          <strong>{stats.groups}</strong>
        </article>
      </div>

      <div className={styles.cards}>
        {items.length ? (
          items.map((course, index) => (
            <article className={styles.card} key={`${course.id}-${index}`}>
              <div className={styles.cardTop}>
                {course.icon_url ? (
                  <img
                    src={course.icon_url}
                    alt=""
                    className={styles.icon}
                  />
                ) : (
                  <div className={styles.iconFallback}>
                    {getCourseTitle(course).slice(0, 1)}
                  </div>
                )}
                <div>
                  <h2>{getCourseTitle(course)}</h2>
                  <span>
                    {user?.role === "parent"
                      ? course.student_name
                        ? `Учится: ${course.student_name}`
                        : "Доступный курс"
                      : course.age_range}
                  </span>
                </div>
              </div>

              <p>{course.description || "Описание курса пока не заполнено."}</p>

              <div className={styles.meta}>
                <span>{course.formatted_price || "Цена не указана"}</span>
                <span>
                  {course.duration_weeks
                    ? `${course.duration_weeks} недель`
                    : "Длительность не указана"}
                </span>
                <span>
                  {getCourseGroupsCount(course)} групп
                </span>
              </div>

              {user?.role === "parent" ? (
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => openCourseApplication(course)}
                >
                  Записать на курс
                </button>
              ) : null}
            </article>
          ))
        ) : (
          <div className={styles.empty}>Курсы пока не найдены.</div>
        )}
      </div>

      <AdminCoursesManager enabled={user?.role === "admin"} />
    </section>
  );
}
