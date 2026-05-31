"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCollectionData, profileApi } from "../api/profileApi";

export function useProfileStudents() {
  const { user, loading: authLoading } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let ignore = false;

    async function loadStudents() {
      setLoading(true);
      setError("");

      try {
        const payload =
          user?.role === "admin"
            ? await profileApi.getAdminStudents()
            : await profileApi.getParentChildren();

        if (!ignore) {
          setStudents(getCollectionData(payload));
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

    const timeoutId = window.setTimeout(loadStudents, 0);

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, [authLoading, refreshKey, user?.role]);

  const stats = useMemo(
    () => ({
      total: students.length,
      active: students.filter((student) => student.status === "active").length,
      graduated: students.filter((student) => student.status === "graduated")
        .length,
      male: students.filter((student) => student.gender === "male").length,
      female: students.filter((student) => student.gender === "female").length,
    }),
    [students],
  );

  const reload = () => {
    setRefreshKey((current) => current + 1);
  };

  return { authLoading, user, loading, error, students, stats, reload };
}
