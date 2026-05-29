"use client";

import { useEffect, useState } from "react";
import styles from "@/features/course/ui/CourseBlockHome/CourseBlockHome.module.css";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import stylesCurrent from "./StatisticBlock.module.css";

export default function StatisticBlock() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getStatistics() {
      try {
        const res = await fetch(
          "https://codzilla-school-backend.local/api/v1/public/statistics",
        );
        const data = await res.json();
        setData(data?.data);
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      } finally {
        setLoading(false);
      }
    }

    getStatistics();
  }, []);

  return (
    <Box className={"flex gap-40 col w-100 ai-center"}>
      <Box className={stylesCurrent.staticBlock}>
        <Box className={"flex col gap-20 ai-center"} sx={{ maxWidth: "571px" }}>
          <Typography variant="h1" component="h1">
            CODZILLA - не просто школа
          </Typography>
          <Typography variant="body2">
            Наша цель — не просто обучить, а вдохновить. Помочь каждому ученику
            почувствовать: я могу создавать технологии, а не просто пользоваться
            ими.
            <br />
            <br />
            Мы развиваем не только технические знания, но и мышление —
            логическое, креативное, инженерное. Учим работать в команде,
            находить решения и не бояться ошибок.
          </Typography>
        </Box>

        <Box className={stylesCurrent.cardsBox}>
          {loading ? (
            <Typography variant="body1">Загрузка статистики...</Typography>
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
                <p className={stylesCurrent.cardText}>года обучения</p>
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
                <p className={stylesCurrent.cardText}>учеников в CODZILLA</p>
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
                <p className={stylesCurrent.cardText}>учебных курсов</p>
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
                <p className={stylesCurrent.cardText}>предподователей</p>
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
          Заказать звонок
          <Image src={"/icons/to.svg"} alt={"to"} width={14} height={14} />
        </Link>
        <p className={styles.courseLabel}>
          Оставьте свои контактные данные и мы перезвоним вам
        </p>
      </Box>
    </Box>
  );
}
