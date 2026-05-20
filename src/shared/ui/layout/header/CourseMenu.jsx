import { Menu, MenuItem, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import SelectIcon from "@/shared/assets/icons/selectIcon.svg";
import useCourses from "@/hooks/useCourses";

export default function CourseMenu() {
  const {courses} = useCourses();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* КНОПКА */}
      <span
        onClick={handleOpen}
        style={{
          color: "#000",
          textTransform: "none",
          fontSize: "16px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "6px",
          cursor: "pointer",
        }}
      >
        Наши курсы
        {/* ИКОНКА С АНИМАЦИЕЙ */}
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Image src={SelectIcon} alt="select" width={14} height={14} />
        </Box>
      </span>

      {/* МЕНЮ */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            marginTop: "8px",
            minWidth: "200px",
          },
          "& .MuiMenu-list": {
            padding: "22px 0",
          },
        }}
      >
        {courses?.slice(0, 4).map((course) => (
          <MenuItem
            key={course.id}
            onClick={handleClose}
            sx={{
              transition: "all 0.2s ease",
              padding: "10px 18px",
              "&:hover": {
                backgroundColor: "#00AAFF",
                color: "#fff",

                "& a": {
                  color: "#fff",
                },

                "& img": {
                  filter: "brightness(0) invert(1)",
                },
              },
            }}
          >
            <Link
              href={`/courses/${course.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <Image
                src={course.icon_url}
                alt={course.name}
                width={20}
                height={20}
              />
              {course.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
