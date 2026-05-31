"use client";

import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import ExitButton from "@/features/auth/ui/ExitButton";

const menuItems = [
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
];

export default function SelectList() {
  const router = useRouter();
  const path = usePathname();
  const { user, loading } = useAuth() || {};

  const availableItems = useMemo(() => {
    if (loading) {
      return [];
    }

    return menuItems.filter((item) => item.roles.includes(user?.role));
  }, [loading, user?.role]);

  return (
    <List
      component="nav"
      aria-label="profile navigation"
      sx={{
        gap: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",

        "& .MuiListItemButton-root.Mui-selected": {
          backgroundColor: "rgba(0, 170, 255, 0.08);",
        },
        "& .MuiListItemButton-root.Mui-selected:hover": {
          backgroundColor: "rgba(0, 170, 255, 0.12);",
        },
        "& .MuiListItemButton-root": {
          borderRadius: "6px",
          height: "40px",
          display: "flex",
          flexGrow: "0",
        },
        "& .MuiListItemText-primary": {
          fontWeight: "500",
          fontSize: "16px",
        },
      }}
    >
      {availableItems.map((item) => (
        <ListItemButton
          key={item.href}
          selected={path === item.href}
          onClick={() => router.push(item.href)}
        >
          <ListItemIcon>
            <Image src={item.icon} alt={item.alt} width={18} height={18} />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}

      <ExitButton />
    </List>
  );
}
