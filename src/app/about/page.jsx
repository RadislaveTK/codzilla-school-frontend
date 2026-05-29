import PageContent from "./PageContent";

export const metadata = {
  title: "О школе Codzilla — Наша миссия и команда",
  description:
    "Узнайте о Codzilla School: опытные преподаватели, современные методики обучения и достижения учеников.",
  keywords: [
    "о школе",
    "команда",
    "миссия",
    "преподаватели",
    "достижения",
    "Codzilla School",
  ],
  openGraph: {
    title: "О школе Codzilla — Наша миссия и команда",
    description:
      "Узнайте о Codzilla School: опытные преподаватели, современные методики и достижения учеников.",
    url: "https://codzilla-school.com/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "О школе Codzilla",
      },
    ],
  },
};

export default function AboutPage() {
  return <PageContent />;
}
