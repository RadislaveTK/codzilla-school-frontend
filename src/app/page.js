import CourseBlockHome from "@/features/course/ui/CourseBlockHome/CourseBlockHome";
import CarouselOne from "@/shared/ui/components/home/CarouselOne";
import CarouselTwo from "@/shared/ui/components/home/CarouselTwo/CarouselTwo";
import StatisticBlock from "@/shared/ui/components/home/StatisticBlock/StatisticBlock";
import JsonLd from "@/shared/config/seo/JsonLd";
import { SITE_URL } from "@/shared/config/site";

export const metadata = {
  title: "Codzilla School — Онлайн школа программирования для детей",
  description: "Научите ребенка программировать с нуля до первых проектов. Интерактивные курсы, реальные проекты и поддержка наставников.",
  keywords: ["программирование для детей", "онлайн школа программирования", "курсы программирования", "Codzilla School", "обучение IT детям"],
  openGraph: {
    title: "Codzilla School — Онлайн школа программирования для детей",
    description: "Научите ребенка программировать с нуля до первых проектов. Запишитесь на пробный урок!",
    url: SITE_URL,
    type: "website",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Codzilla School — онлайн школа программирования для детей",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codzilla School — Онлайн школа программирования для детей",
    description: "Научите ребенка программировать с нуля до первых проектов.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd pageType="home" pageName="home" />
      <div className="page">
        <CarouselOne />
        <CourseBlockHome />
        <StatisticBlock />
        <CarouselTwo />
      </div>
    </>
  );
}
