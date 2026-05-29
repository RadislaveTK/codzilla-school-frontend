import PageContent from "@/app/courses/[slug]/PageContent";

async function getCourse(slug) {
  try {
    const res = await fetch(
      `https://codzilla-school-backend.local/api/v1/public/courses/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    console.log("Загружен курс:", json?.data?.name);
    return json?.data || null;
  } catch (error) {
    console.error("Ошибка при загрузке курса:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: "Курс — Codzilla School",
      description: "Курс программирования для детей в Codzilla School.",
    };
  }

  const title = `${course.name} — Codzilla School`;
  const description =
    course.description || "Курс программирования для детей в Codzilla School.";
  const url = `https://codzilla-school.com/courses/${course.slug}`;
  const imageUrl = course.icon_url?.startsWith("/")
    ? `https://codzilla-school.com${course.icon_url}`
    : course.icon_url || "/og-image.jpg";

  return {
    title,
    description,
    keywords: [
      course.name,
      course.icon_label,
      course.age_range,
      "Codzilla School",
    ],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: course.icon_label || course.name,
        },
      ],
    },
  };
}

export default async function CoursePage({ params }) {
  const resolvedParams = await params;

  const course = await getCourse(resolvedParams.slug);
  return <PageContent course={course} />;
}
