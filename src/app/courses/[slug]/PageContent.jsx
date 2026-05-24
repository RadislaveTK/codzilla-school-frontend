"use client";

import Image from "next/image";
import JsonLd from "../../../shared/config/seo/JsonLd";
import styles from "./PageContent.module.css";
import Link from "next/link";

import { motion } from "framer-motion";
import { Box } from "@mui/material";

export default function PageContent({ course }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course?.name || "Курс",
    description: course?.description || "",
    url: `https://codzilla-school.com/courses/${course?.slug || ""}`,
    provider: {
      "@type": "Organization",
      name: "Codzilla School",
      url: "https://codzilla-school.com",
    },
    offers: {
      "@type": "Offer",
      price: course?.formatted_price || "0",
      priceCurrency: "KZT",
      url: `https://codzilla-school.com/courses/${course?.slug || ""}`,
    },
    ageRange: course?.age_range || "",
    duration: `P${course?.duration_weeks || 0}W`,
  };

  return (
    <>
      <JsonLd pageType="course" additionalData={courseJsonLd} />
      <div className="page">
        <div className={styles.linkWrapper}>
          <Link href={`/courses/${course.slug}`}>
            <motion.p
              className={styles.backLink}
              whileHover="hover"
              transition={{ duration: 0.2, ease: "easeOut" }}
              variants={{
                hover: { x: -4 },
              }}
            >
              <motion.span
                style={{ height: "16px" }}
                whileHover={{ x: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Image
                  className={styles.backLinkImg}
                  src="/icons/arrow-right.svg"
                  alt="Стрелка вправо"
                  width={16}
                  height={16}
                />
              </motion.span>
              Назад к курсам
            </motion.p>
          </Link>
        </div>

        <Box className={styles.contentWrapper}>
          <Box className={styles.contentBox}>
            <Box className={styles.header}>
              <Box className={styles.imageWrapper}>
                <Image
                  src={course.icon_url}
                  alt={course.icon_label}
                  width={80}
                  height={80}
                />
              </Box>
              <Box className={styles.titleWrapper}>
                <span className={styles.type}>{course.icon_label}</span>
                <h1 className={styles.title}>{course.name}</h1>
              </Box>
            </Box>

            <Box className={styles.descriptionWrapper}>
              <p>{course.description}</p>
            </Box>

            <Box className={styles.detailsBox}>
              <Box className={styles.detailsHeader}>
                <h3>О курсе</h3>
                <p>Ключевая информация о программе обучения</p>
              </Box>

              <Box className={styles.detailsContent}>
                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/people.svg"}
                    alt="Иконка людей"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <p>Возраст</p>
                    <h4>{course.age_range}</h4>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/time.svg"}
                    alt="Иконка времени"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <p>Длительность</p>
                    <h4>{course.duration_weeks} недель</h4>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/money.svg"}
                    alt="Иконка денег"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <p>Стоимость</p>
                    <h4>{course.formatted_price}</h4>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/calendar.svg"}
                    alt="Иконка календаря"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <p>Активных групп</p>
                    <h4>{course.active_groups_count}</h4>
                  </Box>
                </div>
              </Box>
            </Box>

            <Box className={styles.skillsWrapper}>
              <Box className={styles.detailsHeader}>
                <h3>Что вы изучите</h3>
                <p>Основные навыки и знания</p>
              </Box>

              Box
            </Box>
          </Box>
          <Box className={styles.sidebarBox}></Box>
        </Box>
      </div>
    </>
  );
}
