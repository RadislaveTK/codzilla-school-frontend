"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCollectionData, profileApi } from "../api/profileApi";

export function useProfileSummary() {
  const { user, loading: authLoading } = useAuth() || {};
  const [state, setState] = useState({
    loading: true,
    error: "",
    courses: [],
    groups: [],
    children: [],
    attendances: [],
    statistics: null,
  });

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setState((current) => ({
        ...current,
        loading: false,
        error: "Авторизуйтесь, чтобы открыть профиль.",
      }));
      return;
    }

    let ignore = false;

    async function loadData() {
      setState((current) => ({ ...current, loading: true, error: "" }));

      try {
        if (user.role === "admin") {
          const [coursesPayload, groupsPayload, statisticsPayload] =
            await Promise.all([
              profileApi.getAdminCourses(),
              profileApi.getAdminGroups(),
              profileApi.getPublicStatistics(),
            ]);

          if (!ignore) {
            setState({
              loading: false,
              error: "",
              courses: getCollectionData(coursesPayload),
              groups: getCollectionData(groupsPayload),
              children: [],
              attendances: [],
              statistics: statisticsPayload?.data || null,
            });
          }
          return;
        }

        const [childrenPayload, statisticsPayload] = await Promise.all([
          profileApi.getParentChildren(),
          profileApi.getPublicStatistics(),
        ]);
        const children = getCollectionData(childrenPayload);
        const attendances = await Promise.all(
          children.map((child) =>
            profileApi.getParentChildAttendance(child.id).catch(() => null),
          ),
        );

        if (!ignore) {
          setState({
            loading: false,
            error: "",
            courses: [],
            groups: [],
            children,
            attendances: attendances.filter(Boolean),
            statistics: statisticsPayload?.data || null,
          });
        }
      } catch (error) {
        if (!ignore) {
          setState((current) => ({
            ...current,
            loading: false,
            error: error.message,
          }));
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [authLoading, user]);

  const stats = useMemo(() => {
    if (user?.role === "admin") {
      return [
        { label: "Курсов", value: state.courses.length },
        { label: "Групп", value: state.groups.length },
        {
          label: "Активных групп",
          value: state.groups.filter((group) => group.status === "active")
            .length,
        },
        {
          label: "Учеников в группах",
          value: state.groups.reduce(
            (sum, group) => sum + (group.students_count || 0),
            0,
          ),
        },
      ];
    }

    const totals = state.attendances.reduce(
      (sum, item) => ({
        total: sum.total + (item?.stats?.total || 0),
        present: sum.present + (item?.stats?.present || 0),
        absent: sum.absent + (item?.stats?.absent || 0),
        late: sum.late + (item?.stats?.late || 0),
      }),
      { total: 0, present: 0, absent: 0, late: 0 },
    );

    return [
      { label: "Детей", value: state.children.length },
      { label: "Занятий", value: totals.total },
      { label: "Присутствий", value: totals.present },
      { label: "Пропусков", value: totals.absent + totals.late },
    ];
  }, [state, user?.role]);

  return { authLoading, user, state, stats };
}
