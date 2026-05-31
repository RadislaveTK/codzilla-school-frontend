"use client";

import { useEffect, useMemo, useState } from "react";
import { getCollectionData, profileApi } from "../api/profileApi";

export function useAttendanceMarker(enabled) {
  const [groups, setGroups] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let ignore = false;

    async function loadGroups() {
      setLoading(true);
      setError("");

      try {
        const payload = await profileApi.getAdminGroups();
        const nextGroups = getCollectionData(payload);

        if (!ignore) {
          setGroups(nextGroups);
          setSelectedGroupId(String(nextGroups[0]?.id || ""));
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

    loadGroups();

    return () => {
      ignore = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !selectedGroupId) {
      return;
    }

    let ignore = false;

    async function loadSchedules() {
      setError("");
      setMessage("");
      setStudents([]);
      setMarks({});

      try {
        const payload = await profileApi.getAdminGroup(selectedGroupId);
        const group = payload?.data || payload;
        const nextSchedules = getCollectionData(group?.schedules);

        if (!ignore) {
          setSchedules(nextSchedules);
          setSelectedScheduleId(String(nextSchedules[0]?.id || ""));
        }
      } catch (requestError) {
        if (!ignore) {
          setSchedules([]);
          setSelectedScheduleId("");
          setError(requestError.message);
        }
      }
    }

    loadSchedules();

    return () => {
      ignore = true;
    };
  }, [enabled, selectedGroupId]);

  useEffect(() => {
    if (!enabled || !selectedScheduleId) {
      return;
    }

    let ignore = false;

    async function loadScheduleForMarking() {
      setError("");
      setMessage("");

      try {
        const payload = await profileApi.getScheduleForMarking(selectedScheduleId);
        const nextStudents = getCollectionData(payload?.data?.students);

        if (!ignore) {
          setStudents(nextStudents);
          setMarks(
            nextStudents.reduce(
              (acc, student) => ({
                ...acc,
                [student.id]: {
                  student_id: student.id,
                  status:
                    student.status && student.status !== "not_marked"
                      ? student.status
                      : "present",
                  reason: student.reason || "",
                },
              }),
              {},
            ),
          );
        }
      } catch (requestError) {
        if (!ignore) {
          setStudents([]);
          setMarks({});
          setError(requestError.message);
        }
      }
    }

    loadScheduleForMarking();

    return () => {
      ignore = true;
    };
  }, [enabled, selectedScheduleId]);

  const setStudentMark = (studentId, field, value) => {
    setMarks((current) => ({
      ...current,
      [studentId]: {
        ...current[studentId],
        student_id: studentId,
        [field]: value,
      },
    }));
  };

  const saveMarks = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await profileApi.markScheduleAttendance(
        selectedScheduleId,
        Object.values(marks),
      );
      setMessage("Посещаемость сохранена");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const selectedSchedule = useMemo(
    () => schedules.find((schedule) => String(schedule.id) === selectedScheduleId),
    [schedules, selectedScheduleId],
  );

  return {
    groups,
    schedules,
    selectedGroupId,
    selectedScheduleId,
    selectedSchedule,
    students,
    marks,
    loading,
    saving,
    message,
    error,
    setSelectedGroupId,
    setSelectedScheduleId,
    setStudentMark,
    saveMarks,
  };
}
