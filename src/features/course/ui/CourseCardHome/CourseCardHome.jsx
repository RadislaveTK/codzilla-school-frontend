import Image from "next/image";
import styles from "./CourseCardHome.module.css";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useI18n } from "@/shared/config/i18n";

export default function CourseCardHome({ course }) {
  const { t } = useI18n();

  return (
    <div className={styles.CourseCard}>
      <Box className={styles.content}>
        <Image src={course.icon_url} alt={course.icon_label} width={60} height={60} />
        <Typography variant="body1">{course.name}</Typography>
        <Typography variant="body2" sx={{ marginTop: "5px" }}>
          {course.description}
        </Typography>
      </Box>

      <Link href={`/courses/${course.slug}`} className={styles.link}>
        <Typography variant="body1">{t("courses.learnMore")}</Typography>{" "}
        <Image src={"/icons/to.svg"} alt={"to"} width={14} height={14} />
      </Link>
    </div>
  );
}
