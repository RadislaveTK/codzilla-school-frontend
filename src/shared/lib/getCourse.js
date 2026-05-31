import { API_URL } from "@/shared/config/api";

export default async function getCourse(slug) {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/courses/${slug}`,
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
