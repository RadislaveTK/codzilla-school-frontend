"use client";

import useCourses from "../../hooks/useCourses";
import JsonLd from "../../shared/config/seo/JsonLd";
import { Box, Typography } from "@mui/material";
import CourseCardsBlock from "../../features/course/ui/CourseCardsBlock/CourseCardsBlock";

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

  return (
    <>
      <JsonLd pageType="courses" additionalData={coursesJsonLd} />
      <div className="page">
        <Box
          className={"flex gap-40 col w-100 ai-center"}
          style={{ maxWidth: 700 }}
        >
          <Typography variant="h1" component="h1">
            Наши курсы
          </Typography>
          <Typography variant="body2" align="center">
            Выберите подходящую программу обучения для вашего ребенка. Мы
            предлагаем курсы по программированию, робототехнике и созданию игр
            для детей разных возрастов.
          </Typography>
        </Box>
		
        {loading ? (
          <p>Загрузка курсов...</p>
        ) : (
          <CourseCardsBlock
            courses={courses}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
    </>
  );
}
