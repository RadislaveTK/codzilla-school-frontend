"use client";

import { useAdminGroupsManager } from "../../model/useAdminGroupsManager";
import { getGroupStatusLabel } from "../../model/normalizers";
import styles from "./AdminGroupsManager.module.css";
import ProfileSelect from "../ProfileSelect/ProfileSelect";

const statuses = [
  { value: "forming", label: "Формируется" },
  { value: "active", label: "Активная" },
  { value: "completed", label: "Завершена" },
  { value: "cancelled", label: "Отменена" },
];

export default function AdminGroupsManager({ enabled }) {
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
          <span>Управление</span>
          <h2>Группы</h2>
        </div>
        <button type="button" onClick={resetForm}>
          Новая группа
        </button>
      </div>

      <form className={styles.form} onSubmit={saveGroup}>
        <label>
          Название
          <input
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder="Например: Scratch Junior"
          />
        </label>

        <label>
          Курс
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
          Мест
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
          Статус
          <ProfileSelect
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label className={styles.wide}>
          Описание
          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Коротко о группе"
          />
        </label>

        <button type="submit" disabled={saving || loading}>
          {form.id ? "Сохранить" : "Создать"}
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
                {group.course?.name || "Курс не указан"} ·{" "}
                {group.students_count || group.current_students || 0}/
                {group.max_students} · {getGroupStatusLabel(group)}
              </span>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => editGroup(group)}>
                Изменить
              </button>
              <button
                type="button"
                onClick={() => deleteGroup(group.id)}
                disabled={saving}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
