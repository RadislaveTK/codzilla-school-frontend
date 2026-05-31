"use client";

import logo from "@/shared/assets/icons/logo.svg";
import kz from "@/shared/assets/icons/kz.svg";
import ru from "@/shared/assets/icons/ru.svg";
import phone from "@/shared/assets/icons/phone.svg";

import styles from "./Header.module.css";

import { Box, Drawer, IconButton, NoSsr, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CourseMenu from "./CourseMenu";
import ProfileButton from "@/features/auth/ui/ProfileButton";
import { useState } from "react";
import useCourses from "@/hooks/useCourses";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { courses } = useCourses();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`${styles.header} flex row ai-center jc-space-between`}>
      <Box className={styles.brandGroup}>
        <Link href="/" className="flex row ai-center gap-4" onClick={closeMobileMenu}>
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h3 className={styles.title}>CODZILLA</h3>
        </Link>

        <Box className="flex row ai-center gap-20">
          <NoSsr>
            <Tooltip title="Казахский" arrow>
              <IconButton>
                <Image src={kz} alt="KZ" width={25} height={25} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Русский" arrow>
              <IconButton>
                <Image src={ru} alt="RU" width={25} height={25} />
              </IconButton>
            </Tooltip>
          </NoSsr>
        </Box>
      </Box>

      <Box className={styles.nav}>
        <Link href="/">Главная</Link>
        {/* <Link href="/about">Курсы</Link> */}
        <CourseMenu />
        <Link href="/about">Контакты</Link>
      </Box>

      <Box className={styles.actions}>
        <Box className={styles.phoneGroup}>
          <Image src={phone} alt="Phone" width={20} height={20} />
          <NoSsr>
            <Tooltip title="Позвонить" arrow>
              <a href="tel:+77052094540" className={styles.phone}>
                +7 705 209 4540
              </a>
            </Tooltip>
          </NoSsr>
        </Box>
        <ProfileButton />
      </Box>

      <IconButton
        className={styles.mobileMenuButton}
        aria-label="Открыть меню"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className={styles.burgerIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </IconButton>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        slotProps={{
          paper: {
            className: styles.mobileDrawerPaper,
          },
        }}
      >
        <Box className={styles.drawerHeader}>
          <Link href="/" className="flex row ai-center gap-4" onClick={closeMobileMenu}>
            <Image src={logo} alt="Logo" width={40} height={40} />
            <h3 className={styles.title}>CODZILLA</h3>
          </Link>
          <IconButton aria-label="Закрыть меню" onClick={closeMobileMenu}>
            <span className={styles.closeIcon} aria-hidden="true" />
          </IconButton>
        </Box>

        <nav className={styles.drawerNav}>
          <Link href="/" onClick={closeMobileMenu}>
            Главная
          </Link>
          <Link href="/courses" onClick={closeMobileMenu}>
            Наши курсы
          </Link>
          {!!courses?.length && (
            <div className={styles.drawerCourses}>
              <span>Популярные курсы</span>
              {courses?.slice(0, 4).map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  onClick={closeMobileMenu}
                  className={styles.drawerCourseLink}
                >
                  <Image
                    src={course.icon_url}
                    alt={course.name}
                    width={22}
                    height={22}
                  />
                  {course.name}
                </Link>
              ))}
            </div>
          )}
          <Link href="/about" onClick={closeMobileMenu}>
            Контакты
          </Link>
        </nav>

        <Box className={styles.drawerFooter}>
          <a href="tel:+77052094540" className={styles.phone}>
            +7 705 209 4540
          </a>
          <ProfileButton />
        </Box>
      </Drawer>
    </header>
  );
}
