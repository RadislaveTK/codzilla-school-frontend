"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCollectionData, profileApi } from "../api/profileApi";
import { getCourseGroupsCount } from "./normalizers";

export function useProfileCourses() {
  const { user, loading: authLoading } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let ignore = false;

    async function loadCourses() {
      setLoading(true);
      setError("");

      try {
        if (user?.role === "admin") {
          const payload = await profileApi.getAdminCourses();
          if (!ignore) {
            setItems(getCollectionData(payload));
          }
          return;
        }

        const [coursesPayload, childrenPayload] = await Promise.all([
          profileApi.getPublicCourses(),
          profileApi.getParentChildren(),
        ]);
        const publicCourses = getCollectionData(coursesPayload);
        const children = getCollectionData(childrenPayload);
        const childCourses = children.reduce((acc, child) => {
          if (!child.current_course_id) {
            return acc;
          }

          return {
            ...acc,
            [child.current_course_id]: child.full_name,
          };
        }, {});
        const courses = publicCourses.map((course) => ({
          ...course,
          student_name: childCourses[course.id],
          is_child_course: Boolean(childCourses[course.id]),
        }));

        if (!ignore) {
          setItems(courses);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCourses();

    return () => {
      ignore = true;
    };
  }, [authLoading, user?.role]);

  const stats = useMemo(
    () => ({
      total: items.length,
      active: items.filter((course) => course.is_active !== false).length,
      groups: items.reduce(
        (sum, course) => sum + getCourseGroupsCount(course),
        0,
      ),
    }),
    [items],
  );

  return { authLoading, user, loading, error, items, stats };
}
