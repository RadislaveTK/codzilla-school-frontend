"use client";

import { Box } from "@mui/material";
import React from "react";
import useCoursesFilter from "./useCoursesFilter";
import CourseFilters from "./CourseFilters";
import CourseGrid from "./CourseGrid";

import styles from "./CourseCardsBlock.module.css";

export default function CourseCardsBlock() {
  const { courses, loading, age, direction, setAge, setDirection } = useCoursesFilter();

  return (
    <Box className={"flex gap-40 col w-100 ai-center"}>
      <CourseFilters age={age} direction={direction} setAge={setAge} setDirection={setDirection} />

      <Box className={styles.GridCards}>
        <CourseGrid courses={courses} loading={loading} />
      </Box>
    </Box>
  );
}
