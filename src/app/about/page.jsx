import JsonLd from "@/shared/config/seo/JsonLd";

export const metadata = {
  title: "О школе Codzilla — Наша миссия и команда",
  description: "Узнайте о Codzilla School: опытные преподаватели, современные методики обучения и достижения учеников.",
  keywords: ["о школе", "команда", "миссия", "преподаватели", "достижения", "Codzilla School"],
  openGraph: {
    title: "О школе Codzilla — Наша миссия и команда",
    description: "Узнайте о Codzilla School: опытные преподаватели, современные методики и достижения учеников.",
    url: "https://codzilla-school.com/about",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "О школе Codzilla",
    }],
  },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Codzilla School",
    url: "https://codzilla-school.com",
    logo: "/logo.svg",
    description: "Онлайн школа программирования для детей",
    sameAs: [
      "https://instagram.com/codzilla",
      "https://facebook.com/codzilla",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+7-705-209-4540",
      email: "info@codzilla-school.com",
    },
  };

  return (
    <>
      <JsonLd pageType="about" additionalData={organizationJsonLd} />
      <div className="page">
        <h1>О школе Codzilla</h1>
        <p>Добро пожаловать на страницу о нашей школе программирования для детей.</p>
      </div>
    </>
  );
}
