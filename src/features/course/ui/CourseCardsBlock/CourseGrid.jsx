"use client";

import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./CourseCardsBlock.module.css";
import { useI18n } from "@/shared/config/i18n";

export default function CourseGrid({ courses = [], loading }) {
  const { t } = useI18n();

  return (
    <>
      {courses.length === 0 && !loading && (
        <p>{t("courses.notFound")}</p>
      )}
      {courses?.map((course, index) => (
        <CourseCard course={course} key={course.id ?? index} />
      ))}
    </>
  );
}
