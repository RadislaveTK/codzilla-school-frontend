"use client";

import {
  getStudentCourseTitle,
  getStudentGroups,
  getStudentStatusLabel,
} from "../../model/normalizers";
import { useProfileStudents } from "../../model/useProfileStudents";
import styles from "./ProfileStudents.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function ProfileStudents() {
  const { authLoading, user, loading, error, students, stats } =
    useProfileStudents();
  const { t } = useI18n();

  if (loading || authLoading) {
    return <div className={styles.status}>{t("profile.loadingStudents")}</div>;
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>{user?.role === "admin" ? t("profile.studentsAdminEyebrow") : t("profile.myChildren")}</span>
        <h1>{t("profile.students")}</h1>
        <p>
          {user?.role === "admin"
            ? t("profile.studentsAdminDescription")
            : t("profile.studentsParentDescription")}
        </p>
      </div>

      <div className={styles.statsGrid}>
        <article>
          <span>{t("profile.total")}</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>{t("profile.active")}</span>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <span>{t("profile.graduates")}</span>
          <strong>{stats.graduated}</strong>
        </article>
        <article>
          <span>{t("profile.maleFemale")}</span>
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
                  {student.full_name?.slice(0, 1) || t("profile.studentInitial")}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div>
                      <h2>{student.full_name}</h2>
                      <span>
                        {student.age ? `${student.age} ${t("courses.filters.years")}` : t("profile.ageNotSpecified")}
                      </span>
                    </div>
                    <mark>{getStudentStatusLabel(student)}</mark>
                  </div>

                  <div className={styles.details}>
                    <span>
                      {t("profile.course")}:{" "}
                      {getStudentCourseTitle(student)}
                    </span>
                    <span>
                      {t("profile.groups")}:{" "}
                      {groups.length
                        ? groups.map((group) => group.name).join(", ")
                        : t("profile.noGroups")}
                    </span>
                    {user?.role === "admin" && student.parent ? (
                      <span>{t("profile.parentLabel")}: {student.parent.name}</span>
                    ) : null}
                    <span>
                      {t("profile.progress")}: {student.current_progress_percent || 0}%
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className={styles.empty}>{t("profile.studentsEmpty")}</div>
        )}
      </div>
    </section>
  );
}
