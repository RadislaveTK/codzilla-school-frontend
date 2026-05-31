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
import { useI18n } from "@/shared/config/i18n";

export default function PageContent({ course }) {
  const bus = useBus();
  const { t } = useI18n();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course?.name || t("profile.course"),
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

  const handleEnrollClick = () => {
    bus.emit("feedbackModal:open", {
      title: t("courses.courseModalTitle"),
      type: "course",
      course: course?.name,
    });
  };

  const handleFeedbackClick = () => {
    bus.emit("feedbackModal:open", {
      title: t("courses.feedbackModalTitle"),
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
              {t("courses.back")}
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
                <h3>{t("courses.aboutCourse")}</h3>
                <p>{t("courses.aboutCourseDescription")}</p>
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
                    <p>{t("courses.age")}</p>
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
                    <p>{t("courses.duration")}</p>
                    <h4>{course.duration_weeks} {t("courses.weeks")}</h4>
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
                    <p>{t("courses.price")}</p>
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
                    <p>{t("courses.activeGroups")}</p>
                    <h4>{course.active_groups_count}</h4>
                  </Box>
                </div>
              </Box>
            </Box>

            <Box className={styles.detailsWrapper}>
              <Box className={styles.detailsHeader}>
                <h3>{t("courses.whatLearn")}</h3>
                <p>{t("courses.skillsDescription")}</p>
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
                <h3>{t("courses.benefits")}</h3>
                <p>{t("courses.benefitsDescription")}</p>
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
                    <h4>{t("courses.practicalTitle")}</h4>
                    <p>{t("courses.practicalDescription")}</p>
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
                    <h4>{t("courses.certificateTitle")}</h4>
                    <p>{t("courses.certificateDescription")}</p>
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
                    <h4>{t("courses.materialsTitle")}</h4>
                    <p>{t("courses.materialsDescription")}</p>
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
                    <h4>{t("courses.projectsTitle")}</h4>
                    <p>{t("courses.projectsDescription")}</p>
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
          <Box className={styles.sidebarBox}>
            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>{t("courses.enrollTitle")}</h3>
                <p>{t("courses.enrollDescription")}</p>
              </Box>
              <Box className={styles.sideContent}>
                <Box className={styles.sidePrice}>
                  <p>{t("courses.coursePrice")}</p>
                  <h1>{course.formatted_price}</h1>
                  <p>{t("courses.fullCourse")}</p>
                </Box>
                <Button
                  variant="contained"
                  color="blue"
                  onClick={handleEnrollClick}
                  sx={stylesMUI.button("blue")}
                >
                  {t("courses.enrollButton")}
                </Button>
                <p className={styles.sideDescription}>
                  {t("courses.managerContact")}
                </p>
              </Box>
            </Box>

            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>{t("courses.availableGroups")}</h3>
                <p>
                  {course?.active_groups_count > 0
                    ? t("courses.groupsAvailable")
                    : t("courses.noGroups")}
                </p>
              </Box>
              {/* <Box className={styles.sideContent}></Box> */}
            </Box>

            <Box className={styles.sideWrapper}>
              <Box className={styles.sideHeader}>
                <h3>{t("courses.questionsTitle")}</h3>
                <p>{t("courses.questionsDescription")}</p>
              </Box>
              <Box className={styles.sideContent}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFeedbackClick}
                  sx={stylesMUI.button("primary")}
                >
                  {t("courses.callButton")}
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
                <h3>{t("courses.info")}</h3>
              </Box>
              <Box className={styles.sideContent}>
                <Box className={styles.flexInfo}>
                  <Box className={styles.infoItem}>
                    <p>{t("courses.status")}</p>
                    <span>{t("courses.active")}</span>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <Box className={styles.infoItem}>
                    <p>{t("courses.lessonsTotal")}</p>
                    <h4>{course?.lessons?.length}</h4>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <Box className={styles.infoItem}>
                    <p>{t("courses.format")}</p>
                    <h4>{t("courses.offline")}</h4>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      <SectionCTA
        color={"var(--blue)"}
        title={t("courses.readyTitle")}
        description={t("courses.readyDescription")}
        button={
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnrollClick}
            sx={stylesMUI.button("white")}
          >
            {t("courses.enrollButton")}
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
    width: color === "white" ? { xs: "100%", sm: "auto" } : "100%",
    color: color === "white" ? "var(--secondary)" : "#fff",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: color === "white" ? "bold" : "500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
    whiteSpace: { xs: "normal", sm: "nowrap" },
    textAlign: "center",
  }),
};
