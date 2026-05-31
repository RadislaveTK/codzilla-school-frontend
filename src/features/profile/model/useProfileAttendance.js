"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCollectionData, profileApi } from "../api/profileApi";
import { getAttendanceRecord } from "./normalizers";

const getAttendanceStats = (attendance, records) => {
  if (attendance?.stats) {
    return attendance.stats;
  }

  if (attendance?.summary) {
    return {
      total: attendance.summary.total_count || 0,
      present: attendance.summary.present_count || 0,
      absent: attendance.summary.absent_count || 0,
      late: attendance.summary.late_count || 0,
    };
  }

  return records.reduce(
    (acc, record) => ({
      ...acc,
      total: acc.total + 1,
      [record.statusKey]: record.statusKey
        ? (acc[record.statusKey] || 0) + 1
        : acc[record.statusKey],
    }),
    { total: 0, present: 0, absent: 0, late: 0 },
  );
};

export function useProfileAttendance() {
  const { user, loading: authLoading } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [children, setChildren] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let ignore = false;

    async function loadBaseData() {
      setLoading(true);
      setError("");

      try {
        if (user?.role === "admin") {
          const groupsPayload = await profileApi.getAdminGroups();
          const nextGroups = getCollectionData(groupsPayload);

          if (!ignore) {
            setGroups(nextGroups);
            setSelectedGroupId(String(nextGroups[0]?.id || ""));
          }
        } else if (user?.role === "parent") {
          const childrenPayload = await profileApi.getParentChildren();
          const nextChildren = getCollectionData(childrenPayload);

          if (!ignore) {
            setChildren(nextChildren);
            setSelectedStudentId(String(nextChildren[0]?.id || ""));
          }
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

    loadBaseData();

    return () => {
      ignore = true;
    };
  }, [authLoading, user?.role]);

  useEffect(() => {
    if (user?.role !== "admin" || !selectedGroupId) {
      return;
    }

    let ignore = false;

    async function loadStudents() {
      setError("");

      try {
        const payload = await profileApi.getAdminGroupStudents(selectedGroupId);
        const nextStudents = getCollectionData(payload);

        if (!ignore) {
          setStudents(nextStudents);
          setAttendance(null);
          setSelectedStudentId(String(nextStudents[0]?.id || ""));
        }
      } catch (requestError) {
        if (!ignore) {
          setStudents([]);
          setAttendance(null);
          setSelectedStudentId("");
          setError(requestError.message);
        }
      }
    }

    loadStudents();

    return () => {
      ignore = true;
    };
  }, [selectedGroupId, user?.role]);

  useEffect(() => {
    if (!selectedStudentId || !user?.role) {
      return;
    }

    let ignore = false;

    async function loadAttendance() {
      setError("");
      setAttendance(null);

      try {
        const payload =
          user.role === "admin"
            ? await profileApi.getAdminStudentAttendance(selectedStudentId)
            : await profileApi.getParentChildAttendance(selectedStudentId);

        if (!ignore) {
          setAttendance(payload);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
        }
      }
    }

    loadAttendance();

    return () => {
      ignore = true;
    };
  }, [selectedStudentId, user?.role]);

  const records = useMemo(() => {
    if (!attendance) {
      return [];
    }

    const items = Array.isArray(attendance.attendances)
      ? attendance.attendances
      : getCollectionData(attendance);

    return items.map(getAttendanceRecord);
  }, [attendance]);

  const stats = useMemo(
    () => getAttendanceStats(attendance, records),
    [attendance, records],
  );

  return {
    authLoading,
    user,
    loading,
    error,
    groups,
    children,
    students,
    selectedGroupId,
    selectedStudentId,
    setSelectedGroupId,
    setSelectedStudentId,
    records,
    stats,
  };
}
