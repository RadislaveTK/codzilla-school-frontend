"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import styles from "./ProfileAdmin.module.css";

const adminSections = [
  {
    href: "/profile/admin/users",
    title: "Пользователи",
    description: "Родители, администраторы и доступ к системе.",
    meta: "Аккаунты",
  },
  {
    href: "/profile/admin/students",
    title: "Ученики и группы",
    description: "Создание ученика, привязка к родителю, курсу и группе.",
    meta: "Состав групп",
  },
  {
    href: "/profile/admin/courses",
    title: "Курсы",
    description: "Программы обучения, возраст, цена, навыки и активность.",
    meta: "Программы",
  },
  {
    href: "/profile/admin/groups",
    title: "Группы",
    description: "Набор, вместимость и статус учебных групп.",
    meta: "Потоки",
  },
  {
    href: "/profile/admin/lessons",
    title: "Занятия",
    description: "Расписание, материалы, домашние задания и кабинеты.",
    meta: "Уроки",
  },
  {
    href: "/profile/admin/attendance",
    title: "Отметка занятия",
    description: "Фиксация присутствия учеников после урока.",
    meta: "Посещаемость",
  },
];

export default function ProfileAdmin() {
  const { user, loading } = useAuth() || {};

  if (loading) {
    return <div className={styles.status}>Загружаем администрирование...</div>;
  }

  if (user?.role !== "admin") {
    return (
      <div className={styles.status}>
        Раздел администрирования доступен только администратору.
      </div>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span>Администрирование</span>
        <h1>Панель управления</h1>
        <p>
          Отдельное место для действий администратора и учителя: пользователи,
          курсы, группы, занятия и отметка посещаемости.
        </p>
      </div>

      <div className={styles.grid}>
        {adminSections.map((section) => (
          <Link className={styles.card} href={section.href} key={section.href}>
            <span>{section.meta}</span>
            <strong>{section.title}</strong>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
