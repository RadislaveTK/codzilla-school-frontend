"use client";

import { useEffect, useMemo, useState } from "react";
import { getCollectionData, profileApi } from "../api/profileApi";

const emptyForm = {
  id: null,
  name: "",
  course_id: "",
  max_students: 12,
  description: "",
  status: "forming",
};

export function useAdminGroupsManager(enabled) {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const firstCourseId = courses[0]?.id ? String(courses[0].id) : "";

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [groupsPayload, coursesPayload] = await Promise.all([
        profileApi.getAdminGroups(),
        profileApi.getAdminCourses(),
      ]);
      const nextCourses = getCollectionData(coursesPayload);

      setGroups(getCollectionData(groupsPayload));
      setCourses(nextCourses);
      setForm((current) => ({
        ...current,
        course_id: current.course_id || String(nextCourses[0]?.id || ""),
      }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timeoutId = window.setTimeout(loadData, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [enabled]);

  const setField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm({ ...emptyForm, course_id: firstCourseId });
  };

  const editGroup = (group) => {
    setMessage("");
    setError("");
    setForm({
      id: group.id,
      name: group.name || "",
      course_id: String(group.course_id || group.course?.id || firstCourseId),
      max_students: group.max_students || 12,
      description: group.description || "",
      status: group.status || "forming",
    });
  };

  const saveGroup = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      name: form.name,
      max_students: Number(form.max_students),
      description: form.description || null,
      status: form.status,
    };

    try {
      if (form.id) {
        await profileApi.updateAdminGroup(form.id, payload);
        setMessage("Группа обновлена");
      } else {
        await profileApi.createAdminGroup({
          ...payload,
          course_id: Number(form.course_id),
        });
        setMessage("Группа создана");
      }

      resetForm();
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteGroup = async (groupId) => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await profileApi.deleteAdminGroup(groupId);
      setMessage("Группа удалена");
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const courseOptions = useMemo(
    () => courses.map((course) => ({ value: course.id, label: course.name })),
    [courses],
  );

  return {
    groups,
    form,
    loading,
    saving,
    message,
    error,
    courseOptions,
    setField,
    editGroup,
    saveGroup,
    deleteGroup,
    resetForm,
  };
}
