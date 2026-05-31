"use client";

import { useAdminCoursesManager } from "../../model/useAdminCoursesManager";
import styles from "./AdminCoursesManager.module.css";
import ProfileSelect from "../ProfileSelect/ProfileSelect";

export default function AdminCoursesManager({ enabled }) {
  const {
    courses,
    icons,
    form,
    loading,
    saving,
    message,
    error,
    setField,
    resetForm,
    editCourse,
    saveCourse,
    deleteCourse,
  } = useAdminCoursesManager(enabled);

  if (!enabled) {
    return null;
  }

  return (
    <article className={styles.manager}>
      <div className={styles.header}>
        <div>
          <span>Управление</span>
          <h2>Курсы</h2>
        </div>
        <button type="button" onClick={resetForm}>
          Новый курс
        </button>
      </div>

      <form className={styles.form} onSubmit={saveCourse}>
        <label>
          Название
          <input
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
          />
        </label>

        <label>
          Направление
          <ProfileSelect
            value={form.icon}
            onChange={(event) => setField("icon", event.target.value)}
          >
            {(icons.length
              ? icons
              : [{ value: "programming", label: "Программирование" }]
            ).map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label>
          Возраст от
          <input
            min="3"
            required
            type="number"
            value={form.age_from}
            onChange={(event) => setField("age_from", event.target.value)}
          />
        </label>

        <label>
          Возраст до
          <input
            min={form.age_from}
            required
            type="number"
            value={form.age_to}
            onChange={(event) => setField("age_to", event.target.value)}
          />
        </label>

        <label>
          Цена
          <input
            min="0"
            required
            type="number"
            value={form.price}
            onChange={(event) => setField("price", event.target.value)}
          />
        </label>

        <label>
          Недель
          <input
            min="1"
            required
            type="number"
            value={form.duration_weeks}
            onChange={(event) => setField("duration_weeks", event.target.value)}
          />
        </label>

        <label>
          Активен
          <ProfileSelect
            value={String(form.is_active)}
            onChange={(event) => setField("is_active", event.target.value === "true")}
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </ProfileSelect>
        </label>

        <label className={styles.wide}>
          Описание
          <textarea
            required
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
          />
        </label>

        <label className={styles.wide}>
          Навыки, каждый с новой строки
          <textarea
            value={form.basic_skills}
            onChange={(event) => setField("basic_skills", event.target.value)}
          />
        </label>

        <button type="submit" disabled={saving || loading}>
          {form.id ? "Сохранить курс" : "Создать курс"}
        </button>
      </form>

      {message ? <div className={styles.message}>{message}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      <div className={styles.list}>
        {courses.map((course) => (
          <div className={styles.row} key={course.id}>
            <div>
              <strong>{course.name}</strong>
              <span>
                {course.age_range} · {course.formatted_price} ·{" "}
                {course.groups_count || 0} групп
              </span>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => editCourse(course)}>
                Изменить
              </button>
              <button
                type="button"
                onClick={() => deleteCourse(course.id)}
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
