"use client";

import { useAdminLessonsManager } from "../../model/useAdminLessonsManager";
import { formatDateTimeRange } from "../../model/normalizers";
import styles from "./AdminLessonsManager.module.css";
import ProfileSelect from "../ProfileSelect/ProfileSelect";
import { useI18n } from "@/shared/config/i18n";

export default function AdminLessonsManager({ enabled }) {
  const { t } = useI18n();
  const {
    lessons,
    form,
    loading,
    saving,
    message,
    error,
    groupOptions,
    setField,
    resetForm,
    editLesson,
    saveLesson,
    deleteLesson,
  } = useAdminLessonsManager(enabled);

  if (!enabled) {
    return null;
  }

  return (
    <article className={styles.manager}>
      <div className={styles.header}>
        <div>
          <span>{t("profile.teacher")}</span>
          <h2>{t("profile.lessonsAndMaterials")}</h2>
        </div>
        <button type="button" onClick={resetForm}>
          {t("profile.newLesson")}
        </button>
      </div>

      <form className={styles.form} onSubmit={saveLesson}>
        <label>
          {t("profile.group")}
          <ProfileSelect
            required
            value={form.group_id}
            onChange={(event) => setField("group_id", event.target.value)}
          >
            {groupOptions.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label>
          {t("profile.topic")}
          <input
            required
            value={form.title}
            onChange={(event) => setField("title", event.target.value)}
          />
        </label>

        <label>
          {t("profile.start")}
          <input
            required
            type="datetime-local"
            value={form.starts_at}
            onChange={(event) => setField("starts_at", event.target.value)}
          />
        </label>

        <label>
          {t("profile.end")}
          <input
            type="datetime-local"
            value={form.ends_at}
            onChange={(event) => setField("ends_at", event.target.value)}
          />
        </label>

        <label>
          {t("profile.room")}
          <input
            value={form.room}
            onChange={(event) => setField("room", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          {t("profile.descriptionField")}
          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          {t("profile.materialsEachLine")}
          <textarea
            value={form.materials}
            onChange={(event) => setField("materials", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          {t("profile.homework")}
          <textarea
            value={form.homework}
            onChange={(event) => setField("homework", event.target.value)}
          />
        </label>

        <button type="submit" disabled={saving || loading || !groupOptions.length}>
          {form.id ? t("profile.save") : t("profile.create")}
        </button>
      </form>

      {message ? <div className={styles.message}>{message}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      <div className={styles.list}>
        {lessons.length ? (
          lessons.map((lesson) => (
            <div className={styles.row} key={lesson.id}>
              <div>
                <strong>{lesson.title || lesson.lesson_title}</strong>
                <span>
                  {lesson.group?.name || t("profile.noGroup")} ·{" "}
                  {formatDateTimeRange(lesson.starts_at, lesson.ends_at)}
                </span>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => editLesson(lesson)}>
                  {t("profile.edit")}
                </button>
                <button
                  type="button"
                  onClick={() => deleteLesson(lesson.id)}
                  disabled={saving}
                >
                  {t("profile.delete")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>{t("profile.lessonsEmpty")}</div>
        )}
      </div>
    </article>
  );
}
