"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SelectIcon from "@/shared/assets/icons/selectIcon.svg";
import useCourses from "@/hooks/useCourses";

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
  },
  button: {
    display: "flex",
    alignItems: "end",
    gap: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  iconBox: {
    display: "flex",
    transition: "transform 0.3s ease",
  },
  menu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 50,
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 16px 48px rgba(7, 12, 32, 0.12)",
    minWidth: "220px",
    padding: "10px 0",
    border: "1px solid rgba(15, 23, 42, 0.08)",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "12px 16px",
    background: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: "15px",
    color: "#0f172a",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
};

export default function CourseMenu() {
  const { courses } = useCourses();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(closeMenu, 150);
  }, [clearTimer, closeMenu]);

  const handleButtonClick = useCallback(() => {
    clearTimer();
    closeMenu();
    router.push("/courses");
  }, [clearTimer, closeMenu, router]);

  const handleCourseClick = useCallback(
    (slug) => {
      clearTimer();
      closeMenu();
      router.push(`/courses/${slug}`);
    },
    [clearTimer, closeMenu, router],
  );

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <span onClick={handleButtonClick} style={styles.button}>
        Наши курсы
        <div
          style={{
            ...styles.iconBox,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Image src={SelectIcon} alt="select" width={14} height={14} />
        </div>
      </span>

      {open && (
        <div style={styles.menu}>
          {courses?.slice(0, 4).map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => handleCourseClick(course.slug)}
              style={styles.menuItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(15, 23, 42, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div style={styles.menuItemContent}>
                <Image
                  src={course.icon_url}
                  alt={course.name}
                  width={20}
                  height={20}
                />
                {course.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
