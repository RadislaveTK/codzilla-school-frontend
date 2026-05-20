import styles from "./page.module.css";

import CourseBlockHome from "@/features/course/ui/CourseBlockHome/CourseBlockHome";
import CarouselOne from "@/shared/ui/components/home/CarouselOne";
import CarouselTwo from "@/shared/ui/components/home/CarouselTwo";
import StatisticBlock from "@/shared/ui/components/home/StatisticBlock";

export const metadata = {
  title: "Codzilla School — Онлайн школа программирования для детей",
  description:
    "Codzilla School — современная онлайн школа программирования для детей. Курсы по веб-разработке, логике и IT-навыкам с практикой и поддержкой.",
  keywords: [
    "программирование для детей",
    "онлайн школа программирования",
    "курсы программирования",
    "Codzilla School",
    "обучение IT детям"
  ],
};

export default function Home() {
  return (
    <div className="page">
      <CarouselOne />
      <CourseBlockHome />
      <StatisticBlock />
      <CarouselTwo />
    </div>
  );
}
