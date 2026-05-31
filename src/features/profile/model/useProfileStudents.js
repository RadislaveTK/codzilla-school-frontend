"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCollectionData, profileApi } from "../api/profileApi";

export function useProfileStudents() {
  const { user, loading: authLoading } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let ignore = false;

    async function loadStudents() {
      setLoading(true);
      setError("");

      try {
        if (user?.role === "admin") {
          const groupsPayload = await profileApi.getAdminGroups();
          const groups = getCollectionData(groupsPayload);
          const groupStudentsPayload = await Promise.all(
            groups.map((group) =>
              profileApi.getAdminGroupStudents(group.id).then((payload) => ({
                group,
                students: getCollectionData(payload),
              })),
            ),
          );

          const byId = new Map();
          groupStudentsPayload.forEach(({ group, students: groupStudents }) => {
            groupStudents.forEach((student) => {
              const current = byId.get(student.id) || {
                ...student,
                groups_list: [],
              };
              current.groups_list.push(group);
              byId.set(student.id, current);
            });
          });

          if (!ignore) {
            setStudents(Array.from(byId.values()));
          }
          return;
        }

        const payload = await profileApi.getParentChildren();
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

    loadStudents();

    return () => {
      ignore = true;
    };
  }, [authLoading, user?.role]);

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

  return { authLoading, user, loading, error, students, stats };
}
