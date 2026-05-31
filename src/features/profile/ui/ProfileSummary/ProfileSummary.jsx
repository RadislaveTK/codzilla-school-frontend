"use client";

import { useProfileSummary } from "../../model/useProfileSummary";
import { getGroupStatusLabel } from "../../model/normalizers";
import styles from "./ProfileSummary.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileSummary() {
  const { authLoading, user, state, stats } = useProfileSummary();
  const { t } = useI18n();

  if (state.loading || authLoading) {
    return <div className={styles.status}>{t("profile.loadingSummary")}</div>;
  }

  if (state.error) {
    return <div className={styles.status}>{state.error}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? t("profile.admin") : t("profile.parent")}</span>
        <h1>{t("profile.summary")}</h1>
        <p>{t("profile.summaryDescription")}</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((item) => (
          <article className={styles.statCard} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      {user?.role === "admin" ? (
        <>
          <div className={styles.contentGrid}>
            <article className={styles.panel}>
              <h2>{t("profile.groups")}</h2>
              <div className={styles.list}>
                {state.groups.slice(0, 6).map((group) => (
                  <div className={styles.row} key={group.id}>
                    <div>
                      <strong>{group.name}</strong>
                      <span>
                        {group.course?.name || t("profile.courseNotSpecified")} ·{" "}
                        {getGroupStatusLabel(group)}
                      </span>
                    </div>
                    <mark>
                      {group.students_count || 0}/{group.max_students}
                    </mark>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel}>
              <h2>{t("nav.courses")}</h2>
              <div className={styles.list}>
                {state.courses.slice(0, 6).map((course) => (
                  <div className={styles.row} key={course.id}>
                    <div>
                      <strong>{course.name}</strong>
                      <span>{course.age_range}</span>
                    </div>
                    <mark>{course.formatted_price}</mark>
                  </div>
                ))}
              </div>
            </article>
          </div>

        </>
      ) : (
        <div className={styles.contentGrid}>
          {state.children.map((child) => (
            <article className={styles.panel} key={child.id}>
              <h2>{child.full_name}</h2>
              <div className={styles.details}>
                <span>{t("profile.age")}: {child.age || t("profile.notSpecified")}</span>
                <span>
                  {t("profile.course")}: {child.current_course?.name || t("profile.courseNotAssigned")}
                </span>
                <span>{t("profile.progress")}: {child.current_progress_percent || 0}%</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
