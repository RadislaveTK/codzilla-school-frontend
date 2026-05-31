"use client";

import { useAdminLessonsManager } from "../../model/useAdminLessonsManager";
import { formatDateTimeRange } from "../../model/normalizers";
import styles from "./AdminLessonsManager.module.css";

export default function AdminLessonsManager({ enabled }) {
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
          <span>Учитель</span>
          <h2>Занятия и материалы</h2>
        </div>
        <button type="button" onClick={resetForm}>
          Новое занятие
        </button>
      </div>

      <form className={styles.form} onSubmit={saveLesson}>
        <label>
          Группа
          <select
            required
            value={form.group_id}
            onChange={(event) => setField("group_id", event.target.value)}
          >
            {groupOptions.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Тема
          <input
            required
            value={form.title}
            onChange={(event) => setField("title", event.target.value)}
          />
        </label>

        <label>
          Начало
          <input
            required
            type="datetime-local"
            value={form.starts_at}
            onChange={(event) => setField("starts_at", event.target.value)}
          />
        </label>

        <label>
          Конец
          <input
            type="datetime-local"
            value={form.ends_at}
            onChange={(event) => setField("ends_at", event.target.value)}
          />
        </label>

        <label>
          Кабинет
          <input
            value={form.room}
            onChange={(event) => setField("room", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          Описание
          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          Материалы, каждый с новой строки
          <textarea
            value={form.materials}
            onChange={(event) => setField("materials", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          Домашнее задание
          <textarea
            value={form.homework}
            onChange={(event) => setField("homework", event.target.value)}
          />
        </label>

        <button type="submit" disabled={saving || loading || !groupOptions.length}>
          {form.id ? "Сохранить" : "Создать"}
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
                  {lesson.group?.name || "Группа не указана"} ·{" "}
                  {formatDateTimeRange(lesson.starts_at, lesson.ends_at)}
                </span>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => editLesson(lesson)}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() => deleteLesson(lesson.id)}
                  disabled={saving}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Занятия пока не созданы.</div>
        )}
      </div>
    </article>
  );
}
