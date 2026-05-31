"use client";

import { useAdminStudentsManager } from "../../model/useAdminStudentsManager";
import styles from "../AdminUsersManager/AdminUsersManager.module.css";

const genderOptions = [
  { value: "", label: "Не указан" },
  { value: "male", label: "Мальчик" },
  { value: "female", label: "Девочка" },
];

const statusOptions = [
  { value: "active", label: "Активный" },
  { value: "graduated", label: "Выпускник" },
  { value: "left", label: "Выбыл" },
];

export default function AdminStudentsManager({ enabled, onCreated }) {
  const {
    form,
    loading,
    saving,
    message,
    error,
    parentOptions,
    courseOptions,
    groupOptions,
    setField,
    resetForm,
    saveStudent,
  } = useAdminStudentsManager(enabled, onCreated);

  if (!enabled) {
    return null;
  }

  return (
    <article className={styles.manager}>
      <div className={styles.header}>
        <div>
          <span>Администрирование</span>
          <h2>Новый ученик</h2>
        </div>
        <button type="button" onClick={resetForm}>
          Очистить
        </button>
      </div>

      <form className={styles.form} onSubmit={saveStudent}>
        <label>
          ФИО ученика
          <input
            required
            value={form.full_name}
            onChange={(event) => setField("full_name", event.target.value)}
          />
        </label>

        <label>
          Родитель
          <select
            required
            value={form.parent_id}
            onChange={(event) => setField("parent_id", event.target.value)}
          >
            {parentOptions.map((parent) => (
              <option key={parent.value} value={parent.value}>
                {parent.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Группа
          <select
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
          Курс
          <select
            value={form.current_course_id}
            onChange={(event) =>
              setField("current_course_id", event.target.value)
            }
          >
            {courseOptions.map((course) => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Возраст
          <input
            min="3"
            max="18"
            type="number"
            value={form.age}
            onChange={(event) => setField("age", event.target.value)}
          />
        </label>

        <label>
          Пол
          <select
            value={form.gender}
            onChange={(event) => setField("gender", event.target.value)}
          >
            {genderOptions.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Статус
          <select
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={saving || loading || !parentOptions.length}
        >
          Создать и добавить
        </button>
      </form>

      {message ? <div className={styles.message}>{message}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}
    </article>
  );
}
