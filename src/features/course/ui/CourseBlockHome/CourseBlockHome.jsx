"use client";

import useCourses from "@/hooks/useCourses";
import CourseCardHome from "@/features/course/ui/CourseCardHome/CourseCardHome";

import styles from "./CourseBlockHome.module.css";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useI18n } from "@/shared/config/i18n";

export default function CourseBlockHome() {
  const { courses, loading } = useCourses();
  const { t } = useI18n();

  return (
    <Box className={"flex gap-40 col w-100 ai-center"}>
      <Box className={"flex col gap-20 ai-center"}>
        <Typography variant="h1" component="h1">
          {t("home.whyTitle")}
        </Typography>
        <Typography variant="body2" align="center">
          {t("home.whyDescription")}
        </Typography>
      </Box>

      <Box className={styles.homeCoursesGrid}>
        {loading ? (
          <Typography variant="body1">{t("courses.loading")}</Typography>
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
          {t("home.moreCourses")}
          <Image src={"/icons/to.svg"} alt={"to"} width={14} height={14} />
        </Link>
        <p className={styles.courseLabel}>{t("home.moreCoursesDescription")}</p>
      </Box>
    </Box>
  );
}
