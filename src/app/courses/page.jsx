import PageContent from "@/app/courses/PageContent";
import JsonLd from "@/shared/config/seo/JsonLd";
import { SITE_URL } from "@/shared/config/site";

export const metadata = {
  title: "Курсы программирования для детей — Codzilla School",
  description: "Выберите курс программирования для ребенка: веб-разработка, логика, Python, игры. Интерактивные занятия с практикой.",
  keywords: ["курсы программирования", "выбрать курс", "расписание", "цены", "программирование для детей", "Codzilla School"],
  openGraph: {
    title: "Курсы программирования для детей — Codzilla School",
    description: "Выберите курс программирования для ребенка: веб-разработка, Python, игры. Запишитесь на пробный урок!",
    url: `${SITE_URL}/courses`,
    type: "website",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Курсы Codzilla School",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Курсы программирования для детей — Codzilla School",
    description: "Выберите курс программирования для ребенка: веб-разработка, Python, игры.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/courses",
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
