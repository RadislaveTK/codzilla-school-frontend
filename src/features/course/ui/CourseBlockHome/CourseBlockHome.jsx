"use client";

import useCourses from "@/hooks/useCourses";
import CourseCardHome from "@/features/course/ui/CourseCardHome/CourseCardHome";

import styles from "./CourseBlockHome.module.css";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function CourseBlockHome() {
  const { courses, loading } = useCourses();

  return (
    <Box className={"flex gap-40 col w-100 ai-center"}>
      <Box className={"flex col gap-20 ai-center"}>
        <Typography variant="h1" component="h1">
          Почему именно мы?
        </Typography>
        <Typography variant="body2">
          Чем наши курсы отличаются от многих других? Какие есть преимущества?
        </Typography>
      </Box>

      <Box className={"flex row gap-50 w-100 jc-space-between"}>
        {loading ? (
          <Typography variant="body1">Загрузка курсов...</Typography>
        ) : (
          courses
            ?.slice(0, 4)
            ?.map((course) => (
              <CourseCardHome key={course.id} course={course} />
            ))
        )}
      </Box>

      <Box className={styles.courseBtn + " flex col gap-20 ai-center"}>
        <Link href={`/courses`} className={styles.courseBtn_btn + " flex row gap-10 ai-center"}>
          Подробнее о курсах
          <Image src={"/icons/to.svg"} alt={"to"} width={14} height={14} />
        </Link>
        <p className={styles.courseLabel}>Нажмите на кнопку, чтобы узнать больше об информации о курсах</p>
      </Box>
    </Box>
  );
}
