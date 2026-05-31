"use client";

import { useEffect, useState } from "react";
import styles from "@/features/course/ui/CourseBlockHome/CourseBlockHome.module.css";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { API_URL } from "@/shared/config/api";
import { useI18n } from "@/shared/config/i18n";

import stylesCurrent from "./StatisticBlock.module.css";

export default function StatisticBlock() {
  const { t } = useI18n();
  const statDescription = t("home.statDescription");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStatistics() {
      setLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/api/v1/public/statistics`,
        );
        const data = await res.json();
        setData(data?.data);
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = window.setTimeout(getStatistics, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Box className={"flex gap-40 col w-100 ai-center"}>
      <Box className={stylesCurrent.staticBlock}>
        <Box className={"flex col gap-20 ai-center"} sx={{ maxWidth: "571px" }}>
          <Typography variant="h1" component="h1">
            {t("home.statTitle")}
          </Typography>
          <Typography variant="body2" align="center">
            {statDescription.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < statDescription.split("\n").length - 1 ? <br /> : null}
              </span>
            ))}
          </Typography>
        </Box>

        <Box className={stylesCurrent.cardsBox}>
          {loading ? (
            <Typography variant="body1">{t("home.loadingStats")}</Typography>
          ) : (
            <>
              <Box className={stylesCurrent.cardStat}>
                <Box className="flex row gap-10 ai-center">
                  <Image
                    src={"/icons/book.svg"}
                    alt={"book"}
                    width={50}
                    height={50}
                  />
                  <p className={stylesCurrent.cardTitle}>2</p>
                </Box>
                <p className={stylesCurrent.cardText}>{t("home.years")}</p>
              </Box>

              <Box className={stylesCurrent.cardStat}>
                <Box className="flex row gap-10 ai-center">
                  <Image
                    src={"/icons/peoples.svg"}
                    alt={"peoples"}
                    width={50}
                    height={50}
                  />
                  <p className={stylesCurrent.cardTitle}>
                    {data?.total_students}
                  </p>
                </Box>
                <p className={stylesCurrent.cardText}>{t("home.students")}</p>
              </Box>

              <Box className={stylesCurrent.cardStat}>
                <Box className="flex row gap-10 ai-center">
                  <Image
                    src={"/icons/choice.svg"}
                    alt={"choice"}
                    width={50}
                    height={50}
                  />
                  <p className={stylesCurrent.cardTitle}>
                    {data?.total_courses}
                  </p>
                </Box>
                <p className={stylesCurrent.cardText}>{t("home.courses")}</p>
              </Box>

              <Box className={stylesCurrent.cardStat}>
                <Box className="flex row gap-10 ai-center">
                  <Image
                    src={"/icons/edge.svg"}
                    alt={"edge"}
                    width={50}
                    height={50}
                  />
                  <p className={stylesCurrent.cardTitle}>3</p>
                </Box>
                <p className={stylesCurrent.cardText}>{t("home.teachers")}</p>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box className={styles.courseBtn + " flex col gap-20 ai-center"}>
        <Link
          href={`/about`}
          className={styles.courseBtn_btn + " flex row gap-10 ai-center"}
        >
          {t("courses.callButton")}
          <Image src={"/icons/to.svg"} alt={"to"} width={14} height={14} />
        </Link>
        <p className={styles.courseLabel}>
          {t("courses.questionsDescription")}
        </p>
      </Box>
    </Box>
  );
}
