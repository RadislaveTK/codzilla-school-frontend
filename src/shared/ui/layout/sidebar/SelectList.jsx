"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import ExitButton from "@/features/auth/ui/ExitButton";

const menuSections = [
  {
    title: "Профиль",
    items: [
      {
        href: "/profile/panel",
        label: "Сводка",
        icon: "/icons/profile/sidebar/dashboard.svg",
        alt: "dashboard",
        roles: ["admin", "parent"],
      },
      {
        href: "/profile/attendance",
        label: "Посещаемость",
        icon: "/icons/profile/sidebar/calendar.svg",
        alt: "calendar",
        roles: ["admin", "parent"],
      },
      {
        href: "/profile/courses",
        label: "Курсы",
        icon: "/icons/profile/sidebar/school.svg",
        alt: "school",
        roles: ["admin", "parent"],
      },
      {
        href: "/profile/students",
        label: "Ученики",
        icon: "/icons/profile/sidebar/students.svg",
        alt: "students",
        roles: ["admin", "parent"],
      },
    ],
  },
  {
    title: "Администрирование",
    items: [
      {
        href: "/profile/admin",
        label: "Панель управления",
        icon: "/icons/profile/sidebar/dashboard.svg",
        alt: "admin dashboard",
        roles: ["admin"],
      },
      {
        href: "/profile/admin/users",
        label: "Пользователи",
        icon: "/icons/profile/sidebar/students.svg",
        alt: "users",
        roles: ["admin"],
      },
      {
        href: "/profile/admin/students",
        label: "Ученики и группы",
        icon: "/icons/profile/sidebar/students.svg",
        alt: "admin students",
        roles: ["admin"],
      },
      {
        href: "/profile/admin/courses",
        label: "Курсы",
        icon: "/icons/profile/sidebar/school.svg",
        alt: "admin courses",
        roles: ["admin"],
      },
      {
        href: "/profile/admin/lessons",
        label: "Занятия",
        icon: "/icons/profile/sidebar/calendar.svg",
        alt: "lessons",
        roles: ["admin"],
      },
      {
        href: "/profile/admin/attendance",
        label: "Отметка занятия",
        icon: "/icons/profile/sidebar/calendar.svg",
        alt: "attendance marker",
        roles: ["admin"],
      },
    ],
  },
];

export default function SelectList() {
  const router = useRouter();
  const path = usePathname();
  const { user, loading } = useAuth() || {};

  const availableSections = useMemo(() => {
    if (loading) {
      return [];
    }

    return menuSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.roles.includes(user?.role)),
      }))
      .filter((section) => section.items.length);
  }, [loading, user?.role]);

  const isSelected = (href) => {
    if (href === "/profile/admin") {
      return path === href;
    }

    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <List
      component="nav"
      aria-label="profile navigation"
      sx={{
        gap: "14px",
        height: "100%",
        display: "flex",
        flexDirection: "column",

        "& .sidebar-section-title": {
          color: "#586edf",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: 0,
          margin: "6px 8px 8px",
          textTransform: "uppercase",
        },
        "& .MuiListItemButton-root.Mui-selected": {
          backgroundColor: "rgba(0, 170, 255, 0.08);",
        },
        "& .MuiListItemButton-root.Mui-selected:hover": {
          backgroundColor: "rgba(0, 170, 255, 0.12);",
        },
        "& .MuiListItemButton-root": {
          borderRadius: "6px",
          minHeight: "40px",
          display: "flex",
          flexGrow: "0",
          marginBottom: "4px",
        },
        "& .MuiListItemText-primary": {
          fontWeight: "500",
          fontSize: "15px",
        },
      }}
    >
      {availableSections.map((section) => (
        <div key={section.title}>
          <div className="sidebar-section-title">{section.title}</div>
          {section.items.map((item) => (
            <ListItemButton
              key={item.href}
              selected={isSelected(item.href)}
              onClick={() => router.push(item.href)}
            >
              <ListItemIcon>
                <Image src={item.icon} alt={item.alt} width={18} height={18} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </div>
      ))}

      <ExitButton />
    </List>
  );
}
