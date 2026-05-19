"use client";

import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomModal from "../../modal/CustomModal";
import LogoutForm from "@/features/auth/ui/Form/LogoutForm";
import ExitButton from "@/features/auth/ui/ExitButton";

export default function SelectList() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const path = usePathname(); // Получаем текущий путь

  useEffect(() => {
    console.log(path);

    if (path === "/profile/attendance") {
      setSelectedIndex(0);
    } else if (path === "/profile/courses") {
      setSelectedIndex(1);
    } else if (path === "/profile/panel") {
      setSelectedIndex(2);
    } else if (path === "/profile/students") {
      setSelectedIndex(3);
    } else {
      setSelectedIndex(-1);
    }
  }, [path]);

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
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
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => router.push("/profile/panel")}
      >
        <ListItemIcon>
          <Image
            src="/icons/profile/sidebar/dashboard.svg"
            alt="dashboard"
            width={18}
            height={18}
          />
        </ListItemIcon>
        <ListItemText primary="Сводка" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => router.push("/profile/attendance")}
      >
        <ListItemIcon>
          <Image
            src="/icons/profile/sidebar/calendar.svg"
            alt="calendar"
            width={18}
            height={18}
          />
        </ListItemIcon>
        <ListItemText primary="Посещаемость" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => router.push("/profile/courses")}
      >
        <ListItemIcon>
          <Image
            src="/icons/profile/sidebar/school.svg"
            alt="school"
            width={18}
            height={18}
          />
        </ListItemIcon>
        <ListItemText primary="Курсы" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => router.push("/profile/students")}
      >
        <ListItemIcon>
          <Image
            src="/icons/profile/sidebar/students.svg"
            alt="students"
            width={18}
            height={18}
          />
        </ListItemIcon>
        <ListItemText primary="Ученики" />
      </ListItemButton>
      
      <ExitButton />
    </List>
  );
}
