"use client";

import { useEffect, useState } from "react";

export default function useCourses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getCourses() {
      try {
        const res = await fetch(
          "https://codzilla-school-backend.local/api/v1/public/courses",
        );
        const data = await res.json();
        setCourses(data?.data);
      } catch (error) {
        console.error("Ошибка при загрузке курсов:", error);
      } finally {
        setLoading(false);
      }
    }

    getCourses();
  }, []);

  return { courses, loading };
}
