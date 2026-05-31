"use client";

import { getCollectionData } from "../api/profileApi";

export const getNestedCollection = (value) => getCollectionData(value);

export const getCourseTitle = (course) =>
  course?.name || course?.title || "Курс без названия";

export const getCourseGroupsCount = (course) =>
  course?.groups_count || getNestedCollection(course?.groups).length || 0;

export const getStudentGroups = (student) =>
  student?.groups_list || getNestedCollection(student?.groups);

export const roleLabels = {
  admin: "Администратор / учитель",
  parent: "Родитель",
};

export const studentStatusLabels = {
  active: "Активный",
  graduated: "Выпускник",
  left: "Выбыл",
};

export const groupStatusLabels = {
  forming: "Формируется",
  active: "Активная",
  completed: "Завершена",
  cancelled: "Отменена",
};

export const attendanceStatusLabels = {
  present: "Присутствовал",
  absent: "Отсутствовал",
  late: "Опоздал",
  not_marked: "Не отмечено",
};

export const getRoleLabel = (role) => roleLabels[role] || "Роль не указана";

export const getStudentStatusLabel = (student) =>
  student?.status_text || studentStatusLabels[student?.status] || "Статус не указан";

export const getGroupStatusLabel = (group) =>
  group?.status_text || groupStatusLabels[group?.status] || "Статус не указан";

export const getAttendanceStatusLabel = (status) =>
  attendanceStatusLabels[status] || status || "Не отмечено";

export const getActivityLabel = (isActive) => (isActive === false ? "Отключен" : "Активен");

export const getStudentCourseTitle = (student) => {
  const groups = getStudentGroups(student);

  return (
    student?.current_course?.name ||
    student?.currentCourse?.name ||
    groups[0]?.course?.name ||
    "не назначен"
  );
};

export const getAttendanceRecord = (item) => ({
  date: item?.date || item?.marked_at || item?.created_at || "Дата не указана",
  lesson:
    item?.lesson ||
    item?.lesson_title ||
    item?.schedule?.lesson?.title ||
    "Занятие",
  group: item?.group || item?.group_name || item?.schedule?.group?.name || "Без группы",
  status: item?.status_text || getAttendanceStatusLabel(item?.status),
});
