"use client";

/* eslint-disable @next/next/no-img-element */

import { useBus } from "react-bus";
import {
  getCourseGroupsCount,
  getCourseTitle,
} from "../../model/normalizers";
import { useProfileCourses } from "../../model/useProfileCourses";
import styles from "./ProfileCourses.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileCourses() {
  const { authLoading, user, loading, error, items, stats } =
    useProfileCourses();
  const bus = useBus();
  const { t } = useI18n();

  const openCourseApplication = (course) => {
    bus.emit("feedbackModal:open", {
      title: t("courses.courseModalTitle"),
      type: "course",
      course: getCourseTitle(course),
    });
  };

  if (loading || authLoading) {
    return <div className={styles.status}>{t("profile.loadingCourses")}</div>;
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? t("profile.sectionAdmin") : t("profile.learning")}</span>
        <h1>{t("nav.courses")}</h1>
        <p>
          {user?.role === "admin"
            ? t("profile.coursesAdminDescription")
            : t("profile.coursesParentDescription")}
        </p>
      </div>

      <div className={styles.statsGrid}>
        <article>
          <span>{t("profile.totalCourses")}</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>{t("profile.active")}</span>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <span>{t("profile.groups")}</span>
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
                        ? `${t("profile.studying")}: ${course.student_name}`
                        : t("profile.availableCourse")
                      : course.age_range}
                  </span>
                </div>
              </div>

              <p>{course.description || t("profile.courseDescriptionEmpty")}</p>

              <div className={styles.meta}>
                <span>{course.formatted_price || t("profile.priceNotSpecified")}</span>
                <span>
                  {course.duration_weeks
                    ? `${course.duration_weeks} ${t("profile.weeks")}`
                    : t("profile.durationNotSpecified")}
                </span>
                <span>
                  {getCourseGroupsCount(course)} {t("profile.groupsCount")}
                </span>
              </div>

              {user?.role === "parent" ? (
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => openCourseApplication(course)}
                >
                  {t("profile.enrollStudent")}
                </button>
              ) : null}
            </article>
          ))
        ) : (
          <div className={styles.empty}>{t("profile.coursesEmpty")}</div>
        )}
      </div>
    </section>
  );
}
