"use client";

import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./CourseCardsBlock.module.css";

export default function CourseGrid({ courses = [], loading }) {
  return (
    <>
      {courses.length === 0 && !loading && (
        <p>Курсы не найдены. Попробуйте изменить фильтры.</p>
      )}
      {courses?.map((course, index) => (
        <CourseCard course={course} key={course.id ?? index} />
      ))}
    </>
  );
}
