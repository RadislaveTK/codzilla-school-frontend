"use client";

import { useEffect, useState } from "react";
import { getCollectionData, profileApi } from "../api/profileApi";

const emptyForm = {
  id: null,
  name: "",
  icon: "programming",
  age_from: 7,
  age_to: 14,
  description: "",
  basic_skills: "",
  price: 0,
  duration_weeks: 12,
  is_active: true,
};

export function useAdminCoursesManager(enabled) {
  const [courses, setCourses] = useState([]);
  const [icons, setIcons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [coursesPayload, iconsPayload] = await Promise.all([
        profileApi.getAdminCourses(),
        profileApi.getAdminCourseIcons(),
      ]);

      setCourses(getCollectionData(coursesPayload));
      setIcons(getCollectionData(iconsPayload));
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
    setForm(emptyForm);
    setMessage("");
    setError("");
  };

  const editCourse = (course) => {
    setMessage("");
    setError("");
    setForm({
      id: course.id,
      name: course.name || "",
      icon: course.icon || "programming",
      age_from: course.age_from || 7,
      age_to: course.age_to || 14,
      description: course.description || "",
      basic_skills: (course.basic_skills || []).join("\n"),
      price: course.price || 0,
      duration_weeks: course.duration_weeks || 12,
      is_active: course.is_active !== false,
    });
  };

  const getPayload = () => ({
    name: form.name,
    icon: form.icon,
    age_from: Number(form.age_from),
    age_to: Number(form.age_to),
    description: form.description,
    basic_skills: form.basic_skills
      .split("\n")
      .map((skill) => skill.trim())
      .filter(Boolean),
    price: Number(form.price),
    duration_weeks: Number(form.duration_weeks),
    is_active: Boolean(form.is_active),
  });

  const saveCourse = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (form.id) {
        await profileApi.updateAdminCourse(form.id, getPayload());
        setMessage("Курс обновлен");
      } else {
        await profileApi.createAdminCourse(getPayload());
        setMessage("Курс создан");
      }

      resetForm();
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (courseId) => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await profileApi.deleteAdminCourse(courseId);
      setMessage("Курс удален");
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    courses,
    icons,
    form,
    loading,
    saving,
    message,
    error,
    setField,
    resetForm,
    editCourse,
    saveCourse,
    deleteCourse,
  };
}
