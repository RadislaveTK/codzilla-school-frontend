"use client";

import { useAdminGroupsManager } from "../../model/useAdminGroupsManager";
import { getGroupStatusLabel } from "../../model/normalizers";
import styles from "./AdminGroupsManager.module.css";
import ProfileSelect from "../ProfileSelect/ProfileSelect";
import { useI18n } from "@/shared/config/i18n";

const statuses = [
  { value: "forming", labelKey: "profile.forming" },
  { value: "active", labelKey: "courses.active" },
  { value: "completed", labelKey: "profile.completed" },
  { value: "cancelled", labelKey: "profile.cancelled" },
];

export default function AdminGroupsManager({ enabled }) {
  const { t } = useI18n();
  const {
    groups,
    form,
    loading,
    saving,
    message,
    error,
    courseOptions,
    setField,
    editGroup,
    saveGroup,
    deleteGroup,
    resetForm,
  } = useAdminGroupsManager(enabled);

  if (!enabled) {
    return null;
  }

  return (
    <article className={styles.manager}>
      <div className={styles.header}>
        <div>
          <span>{t("profile.management")}</span>
          <h2>{t("profile.groups")}</h2>
        </div>
        <button type="button" onClick={resetForm}>
          {t("profile.newGroup")}
        </button>
      </div>

      <form className={styles.form} onSubmit={saveGroup}>
        <label>
          {t("profile.titleField")}
          <input
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder={t("profile.groupPlaceholder")}
          />
        </label>

        <label>
          {t("profile.course")}
          <ProfileSelect
            required
            value={form.course_id}
            disabled={Boolean(form.id)}
            onChange={(event) => setField("course_id", event.target.value)}
          >
            {courseOptions.map((course) => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label>
          {t("profile.places")}
          <input
            min="1"
            max="30"
            required
            type="number"
            value={form.max_students}
            onChange={(event) => setField("max_students", event.target.value)}
          />
        </label>

        <label>
          {t("profile.status")}
          <ProfileSelect
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {t(status.labelKey)}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label className={styles.wide}>
          {t("profile.descriptionField")}
          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder={t("profile.groupDescriptionPlaceholder")}
          />
        </label>

        <button type="submit" disabled={saving || loading}>
          {form.id ? t("profile.save") : t("profile.create")}
        </button>
      </form>

      {message ? <div className={styles.message}>{message}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      <div className={styles.list}>
        {groups.map((group) => (
          <div className={styles.row} key={group.id}>
            <div>
              <strong>{group.name}</strong>
              <span>
                {group.course?.name || t("profile.courseNotSpecified")} ·{" "}
                {group.students_count || group.current_students || 0}/
                {group.max_students} · {getGroupStatusLabel(group)}
              </span>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => editGroup(group)}>
                {t("profile.edit")}
              </button>
              <button
                type="button"
                onClick={() => deleteGroup(group.id)}
                disabled={saving}
              >
                {t("profile.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
