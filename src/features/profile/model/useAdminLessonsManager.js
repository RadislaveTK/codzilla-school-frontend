"use client";

import { useEffect, useMemo, useState } from "react";
import { getCollectionData, profileApi } from "../api/profileApi";

const emptyForm = {
  id: null,
  group_id: "",
  title: "",
  starts_at: "",
  ends_at: "",
  room: "",
  description: "",
  materials: "",
  homework: "",
};

const getLessonGroupId = (lesson) =>
  lesson.group_id || lesson.group?.id || lesson.schedule?.group_id || "";

export function useAdminLessonsManager(enabled) {
  const [groups, setGroups] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const firstGroupId = groups[0]?.id ? String(groups[0].id) : "";

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [groupsPayload, lessonsPayload] = await Promise.all([
        profileApi.getAdminGroups(),
        profileApi.getAdminLessons(),
      ]);
      const nextGroups = getCollectionData(groupsPayload);

      setGroups(nextGroups);
      setLessons(getCollectionData(lessonsPayload));
      setForm((current) => ({
        ...current,
        group_id: current.group_id || String(nextGroups[0]?.id || ""),
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
    setForm({ ...emptyForm, group_id: firstGroupId });
    setMessage("");
    setError("");
  };

  const editLesson = (lesson) => {
    const materials = getCollectionData(lesson.materials)
      .map((material) =>
        typeof material === "string" ? material : material.url || material.title,
      )
      .filter(Boolean)
      .join("\n");

    setMessage("");
    setError("");
    setForm({
      id: lesson.id,
      group_id: String(getLessonGroupId(lesson) || firstGroupId),
      title: lesson.title || lesson.lesson_title || "",
      starts_at: lesson.starts_at || lesson.start_at || "",
      ends_at: lesson.ends_at || lesson.end_at || "",
      room: lesson.room || "",
      description: lesson.description || "",
      materials,
      homework: lesson.homework || "",
    });
  };

  const getPayload = () => ({
    group_id: Number(form.group_id),
    title: form.title,
    starts_at: form.starts_at,
    ends_at: form.ends_at || null,
    room: form.room || null,
    description: form.description || null,
    materials: form.materials
      .split("\n")
      .map((material) => material.trim())
      .filter(Boolean),
    homework: form.homework || null,
  });

  const saveLesson = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (form.id) {
        await profileApi.updateAdminLesson(form.id, getPayload());
        setMessage("Занятие обновлено");
      } else {
        await profileApi.createAdminLesson(getPayload());
        setMessage("Занятие создано");
      }

      resetForm();
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await profileApi.deleteAdminLesson(lessonId);
      setMessage("Занятие удалено");
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const groupOptions = useMemo(
    () =>
      groups.map((group) => ({
        value: group.id,
        label: `${group.name} - ${group.course?.name || "курс"}`,
      })),
    [groups],
  );

  return {
    lessons,
    form,
    loading,
    saving,
    message,
    error,
    groupOptions,
    setField,
    resetForm,
    editLesson,
    saveLesson,
    deleteLesson,
  };
}
