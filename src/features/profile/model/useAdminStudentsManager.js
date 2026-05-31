"use client";

import { useEffect, useMemo, useState } from "react";
import { getCollectionData, profileApi } from "../api/profileApi";

const emptyForm = {
  full_name: "",
  age: "",
  gender: "",
  status: "active",
  parent_id: "",
  current_course_id: "",
  group_id: "",
};

export function useAdminStudentsManager(enabled, onCreated) {
  const [parents, setParents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [usersPayload, coursesPayload, groupsPayload] = await Promise.all([
        profileApi.getAdminUsers(),
        profileApi.getAdminCourses(),
        profileApi.getAdminGroups(),
      ]);
      const nextParents = getCollectionData(usersPayload).filter(
        (user) => user.role === "parent",
      );
      const nextCourses = getCollectionData(coursesPayload);
      const nextGroups = getCollectionData(groupsPayload);

      setParents(nextParents);
      setCourses(nextCourses);
      setGroups(nextGroups);
      setForm((current) => ({
        ...current,
        parent_id: current.parent_id || String(nextParents[0]?.id || ""),
        current_course_id: current.current_course_id || String(nextCourses[0]?.id || ""),
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
    setForm((current) => {
      if (name !== "group_id") {
        return { ...current, [name]: value };
      }

      const group = groups.find((item) => String(item.id) === String(value));

      return {
        ...current,
        group_id: value,
        current_course_id: group?.course_id
          ? String(group.course_id)
          : current.current_course_id,
      };
    });
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,
      parent_id: String(parents[0]?.id || ""),
      current_course_id: String(courses[0]?.id || ""),
      group_id: String(groups[0]?.id || ""),
    });
    setMessage("");
    setError("");
  };

  const saveStudent = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await profileApi.createAdminStudent({
        full_name: form.full_name,
        age: form.age ? Number(form.age) : null,
        gender: form.gender || null,
        status: form.status,
        parent_id: Number(form.parent_id),
        current_course_id: form.current_course_id
          ? Number(form.current_course_id)
          : null,
        group_id: form.group_id ? Number(form.group_id) : null,
      });

      setMessage("Ученик создан и добавлен в группу");
      resetForm();
      await onCreated?.();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const parentOptions = useMemo(
    () => parents.map((parent) => ({ value: parent.id, label: parent.name })),
    [parents],
  );
  const courseOptions = useMemo(
    () => courses.map((course) => ({ value: course.id, label: course.name })),
    [courses],
  );
  const groupOptions = useMemo(
    () =>
      groups.map((group) => ({
        value: group.id,
        label: `${group.name} - ${group.course?.name || "курс"}`,
      })),
    [groups],
  );

  return {
    form,
    loading,
    saving,
    message,
    error,
    parentOptions,
    courseOptions,
    groupOptions,
    setField,
    resetForm,
    saveStudent,
  };
}
