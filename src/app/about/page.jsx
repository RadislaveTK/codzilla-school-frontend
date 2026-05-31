import PageContent from "./PageContent";
import { SITE_URL } from "@/shared/config/site";

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
    url: `${SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "О школе Codzilla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "О школе Codzilla — Наша миссия и команда",
    description:
      "Узнайте о Codzilla School: опытные преподаватели, современные методики и достижения учеников.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <PageContent />;
}
