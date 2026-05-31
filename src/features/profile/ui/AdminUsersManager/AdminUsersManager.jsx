"use client";

import { useAdminUsersManager } from "../../model/useAdminUsersManager";
import { getActivityLabel, getRoleLabel } from "../../model/normalizers";
import styles from "./AdminUsersManager.module.css";
import ProfileSelect from "../ProfileSelect/ProfileSelect";

const roleOptions = [
  { value: "parent", label: "Родитель" },
  { value: "admin", label: "Администратор / учитель" },
];

export default function AdminUsersManager({ enabled }) {
  const {
    users,
    form,
    loading,
    saving,
    message,
    error,
    setField,
    resetForm,
    editUser,
    saveUser,
    deleteUser,
  } = useAdminUsersManager(enabled);

  if (!enabled) {
    return null;
  }

  return (
    <article className={styles.manager}>
      <div className={styles.header}>
        <div>
          <span>Администрирование</span>
          <h2>Пользователи</h2>
        </div>
        <button type="button" onClick={resetForm}>
          Новый пользователь
        </button>
      </div>

      <form className={styles.form} onSubmit={saveUser}>
        <label>
          Имя
          <input
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
          />
        </label>

        <label>
          Телефон
          <input
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
          />
        </label>

        <label>
          Роль
          <ProfileSelect
            value={form.role}
            onChange={(event) => setField("role", event.target.value)}
          >
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </ProfileSelect>
        </label>

        <label>
          Пароль
          <input
            minLength="6"
            required={!form.id}
            type="password"
            value={form.password}
            placeholder={form.id ? "Оставьте пустым без изменений" : ""}
            onChange={(event) => setField("password", event.target.value)}
          />
        </label>

        <label>
          Активен
          <ProfileSelect
            value={String(form.is_active)}
            onChange={(event) =>
              setField("is_active", event.target.value === "true")
            }
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </ProfileSelect>
        </label>

        <button type="submit" disabled={saving || loading}>
          {form.id ? "Сохранить" : "Создать"}
        </button>
      </form>

      {message ? <div className={styles.message}>{message}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      <div className={styles.list}>
        {users.length ? (
          users.map((user) => (
            <div className={styles.row} key={user.id}>
              <div>
                <strong>{user.name || user.full_name}</strong>
                <span>
                  {user.email} · {getRoleLabel(user.role)} ·{" "}
                  {getActivityLabel(user.is_active)}
                </span>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => editUser(user)}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() => deleteUser(user.id)}
                  disabled={saving}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Пользователи пока не найдены.</div>
        )}
      </div>
    </article>
  );
}
