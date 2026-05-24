"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function useCoursesFilter(initial = { age: "", direction: "" }) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [age, setAge] = useState(initial.age);
  const [direction, setDirection] = useState(initial.direction);
  const timerRef = useRef(null);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (age) params.set("age_group", age);
    if (direction) params.set("direction", direction);
    return params.toString();
  }, [age, direction]);

  useEffect(() => {
    let cancelled = false;
    async function getCourses() {
      setLoading(true);
      try {
        const q = buildQuery();
        const res = await fetch(
          `https://codzilla-school-backend.local/api/v1/public/courses?${q}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (!cancelled) setCourses(data?.data || []);
      } catch (err) {
        if (!cancelled) setCourses([]);
        // keep console for debug
        console.error("Ошибка при загрузке курсов:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // small debounce to avoid rapid calls when changing two selects quickly
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(getCourses, 50);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [buildQuery]);

  return {
    courses,
    loading,
    age,
    direction,
    setAge,
    setDirection,
  };
}
