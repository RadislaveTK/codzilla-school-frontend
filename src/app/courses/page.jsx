import PageContent from "@/app/courses/PageContent";
import JsonLd from "@/shared/config/seo/JsonLd";

export const metadata = {
  title: "Курсы программирования для детей — Codzilla School",
  description: "Выберите курс программирования для ребенка: веб-разработка, логика, Python, игры. Интерактивные занятия с практикой.",
  keywords: ["курсы программирования", "выбрать курс", "расписание", "цены", "программирование для детей", "Codzilla School"],
  openGraph: {
    title: "Курсы программирования для детей — Codzilla School",
    description: "Выберите курс программирования для ребенка: веб-разработка, Python, игры. Запишитесь на пробный урок!",
    url: "https://codzilla-school.com/courses",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Курсы Codzilla School",
    }],
  },
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd pageType="courses" />
      <PageContent />
    </>
  );
}