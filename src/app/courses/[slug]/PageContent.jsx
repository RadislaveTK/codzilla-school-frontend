"use client";

import Image from "next/image";
import JsonLd from "../../../shared/config/seo/JsonLd";
import styles from "./PageContent.module.css";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useBus } from "react-bus";
import SectionCTA from "@/shared/ui/components/home/SectionCTA/SectionCTA";

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

  const bus = useBus();

  const handleEnrollClick = () => {
    bus.emit("feedbackModal:open", {
      title: "Запись на курс",
      type: "course",
      course: course?.name,
    });
  };

  const handleFeedbackClick = () => {
    bus.emit("feedbackModal:open", {
      title: "Обратная связь",
      type: "feedback"
    });
  };

  return (
    <>
      <JsonLd pageType="course" additionalData={courseJsonLd} />
      <div className="page">
        <div className={styles.linkWrapper}>
          <Link href={`/courses`}>
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
                  width={40}
                  height={40}
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

            <Box className={styles.detailsWrapper}>
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

            <Box className={styles.detailsWrapper}>
              <Box className={styles.detailsHeader}>
                <h3>Что вы изучите</h3>
                <p>Основные навыки и знания</p>
              </Box>

              <List
                dense={false}
                sx={{
                  padding: 0,
                  "& .MuiListItem-root": {
                    paddingLeft: 0,
                  },
                  "& .MuiListItemText-primary": {
                    color: "#586EDF",
                    fontSize: "16px",
                    fontWeight: "400",
                  },
                }}
              >
                {course.basic_skills.map((skill, index) => (
                  // <li key={index} className={styles.skillItem}>
                  //   {skill}
                  // </li>
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Image
                        src="/icons/courses/check.svg"
                        alt="Иконка навыка"
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box className={styles.detailsWrapper}>
              <Box className={styles.detailsHeader}>
                <h3>Преимущества</h3>
                <p>Почему стоит выбрать этот курс</p>
              </Box>

              <Box className={styles.detailsContent}>
                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/circle.svg"}
                    alt="Иконка круга"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <h4>Практический подход</h4>
                    <p>Каждое занятие включает практические задания</p>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/certificate.svg"}
                    alt="Иконка сертификата"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <h4>Сертификат</h4>
                    <p>По окончании курса вы получите сертификат</p>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/book.svg"}
                    alt="Иконка книги"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <h4>Материалы</h4>
                    <p>Доступ к учебным материалам и ресурсам</p>
                  </Box>
                </div>

                <div className={styles.detailItem}>
                  <Image
                    src={"/icons/courses/course/idea.svg"}
                    alt="Иконка идеи"
                    width={56}
                    height={56}
                  />
                  <Box className={styles.detailText}>
                    <h4>Проекты</h4>
                    <p>Создание реальных проектов в портфолио</p>
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
          <Box className={styles.sidebarBox}>
            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>Записаться на курс</h3>
                <p>Начните обучение уже сегодня</p>
              </Box>
              <Box className={styles.sideContent}>
                <Box className={styles.sidePrice}>
                  <p>Стоимость курса</p>
                  <h1>{course.formatted_price}</h1>
                  <p>за полный курс</p>
                </Box>
                <Button
                  variant="contained"
                  color="blue"
                  onClick={handleEnrollClick}
                  sx={stylesMUI.button("blue")}
                >
                  Записаться на курс
                </Button>
                <p className={styles.sideDescription}>
                  После записи с вами свяжется наш менеджер
                </p>
              </Box>
            </Box>

            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>Доступные группы</h3>
                <p>
                  {course?.active_groups_count > 0
                    ? "Есть доступные группы"
                    : "Нет активных групп"}
                </p>
              </Box>
              {/* <Box className={styles.sideContent}></Box> */}
            </Box>

            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>Остались вопросы?</h3>
                <p>Оставьте свои контактные данные и мы перезвоним вам</p>
              </Box>
              <Box className={styles.sideContent}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFeedbackClick}
                  sx={stylesMUI.button("primary")}
                >
                  Заказать звонок
                  <Image
                    src={"/icons/social/phone.svg"}
                    alt="Иконка телефона"
                    width={20}
                    height={20}
                  />
                </Button>
              </Box>
            </Box>

            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>Информация</h3>
              </Box>
              <Box className={styles.sideContent}>
                <Box className={styles.flexInfo}>
                  <Box className={styles.infoItem}>
                    <p>Статус</p>
                    <span>Активен</span>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <Box className={styles.infoItem}>
                    <p>Всего уроков</p>
                    <h4>{course?.lessons?.length}</h4>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <Box className={styles.infoItem}>
                    <p>Формат</p>
                    <h4>Офлайн</h4>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      <SectionCTA
        color={"var(--blue)"}
        title={"Готовы начать обучение?"}
        description={
          "Запишитесь на курс прямо сейчас и получите доступ к материалам и поддержке преподавателей"
        }
        button={
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnrollClick}
            sx={stylesMUI.button("white")}
          >
            Записаться на курс
          </Button>
        }
      />
    </>
  );
}

const stylesMUI = {
  button: (color) => ({
    backgroundColor:
      color === "primary" ? "#FF48F2" : color === "white" ? "#fff" : "#00AAFF",
    padding: "16px 32px",
    width: color === "white" ? "auto" : "100%",
    color: color === "white" ? "var(--secondary)" : "#fff",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: color === "white" ? "bold" : "500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  }),
};
