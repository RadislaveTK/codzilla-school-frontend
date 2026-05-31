import { API_URL } from "@/shared/config/api";
import { SITE_URL } from "@/shared/config/site";

const publicRoutes = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/courses",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

async function getCourses() {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/courses`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
  const courses = await getCourses();

  return [
    ...publicRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...courses
      .filter((course) => course?.slug)
      .map((course) => ({
        url: `${SITE_URL}/courses/${course.slug}`,
        lastModified: course.updated_at || now,
        changeFrequency: "monthly",
        priority: 0.7,
      })),
  ];
}

