"use client";

import useCourses from "../../hooks/useCourses";
import JsonLd from "../../shared/config/seo/JsonLd";
import { Box, Button, Typography } from "@mui/material";
import CourseCardsBlock from "../../features/course/ui/CourseCardsBlock/CourseCardsBlock";
import SectionCTA from "@/shared/ui/components/home/SectionCTA/SectionCTA";
import { useBus } from "react-bus";
import { useI18n } from "@/shared/config/i18n";

export default function PageContent() {
  const { courses, loading, filter, setFilter } = useCourses();
  const coursesJsonLd = {
    itemListElement: courses?.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.name,
      url: `https://codzilla-school.com/courses/${course.slug}`,
    })),
  };

  const bus = useBus();
  const { t } = useI18n();

  const handleEnrollClick = () => {
    bus.emit("feedbackModal:open", {
      title: t("courses.trialModalTitle"),
      type: "course",
      course: t("courses.trialCourse"),
    });
  };

  return (
    <>
      <JsonLd pageType="courses" additionalData={coursesJsonLd} />
      <div className="page">
        <Box
          className={"flex gap-40 col w-100 ai-center"}
          style={{ maxWidth: 700 }}
        >
          <Typography variant="h1" component="h1">
            {t("courses.title")}
          </Typography>
          <Typography variant="body2" align="center">
            {t("courses.description")}
          </Typography>
        </Box>
		
        {loading ? (
          <p>{t("courses.loading")}</p>
        ) : (
          <CourseCardsBlock
            courses={courses}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
       <SectionCTA
        color={"var(--primary)"}
        title={t("courses.trialTitle")}
        description={t("courses.trialDescription")}
        button={
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnrollClick}
            sx={{ 
              backgroundColor: "#fff",
              color: "#005AB4",
              fontWeight: "400",
              fontSize: "16px",
              padding: "12px 24px",
              borderRadius: "20px",
              width: { xs: "100%", sm: "auto" },
              whiteSpace: { xs: "normal", sm: "nowrap" },
            }}
          >
            {t("courses.trialButton")}
          </Button>
        }
      />
    </>
  );
}
