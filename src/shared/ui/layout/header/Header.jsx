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
import { useI18n } from "@/shared/config/i18n";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { courses } = useCourses();
  const { locale, setLocale, t } = useI18n();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`${styles.header} flex row ai-center jc-space-between`}>
      <Box className={styles.brandGroup}>
        <Link
          href="/"
          className="flex row ai-center gap-4"
          onClick={closeMobileMenu}
        >
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h3 className={styles.title}>CODZILLA</h3>
        </Link>

        <Box className="flex row ai-center gap-20">
          <NoSsr>
            <Tooltip title={t("language.kz")} arrow>
              <IconButton
                color={locale === "kz" ? "blue" : "default"}
                onClick={() => setLocale("kz")}
              >
                <Image src={kz} alt="KZ" width={25} height={25} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("language.ru")} arrow>
              <IconButton
                color={locale === "ru" ? "blue" : "default"}
                onClick={() => setLocale("ru")}
              >
                <Image src={ru} alt="RU" width={25} height={25} />
              </IconButton>
            </Tooltip>
          </NoSsr>
        </Box>
      </Box>

      <Box className={styles.nav}>
        <Link href="/">{t("nav.home")}</Link>
        {/* <Link href="/about">Курсы</Link> */}
        <CourseMenu />
        <Link href="/about">{t("nav.contacts")}</Link>
      </Box>

      <Box className={styles.actions}>
        <Box className={styles.phoneGroup}>
          <Image src={phone} alt="Phone" width={20} height={20} />
          <NoSsr>
            <Tooltip title={t("nav.call")} arrow>
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
        aria-label={t("nav.openMenu")}
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
          <Link
            href="/"
            className="flex row ai-center gap-4"
            onClick={closeMobileMenu}
          >
            <Image src={logo} alt="Logo" width={40} height={40} />
            <h3 className={styles.title}>CODZILLA</h3>
          </Link>
          <IconButton aria-label={t("nav.closeMenu")} onClick={closeMobileMenu}>
            <span className={styles.closeIcon} aria-hidden="true" />
          </IconButton>
        </Box>

        <nav className={styles.drawerNav}>
          <Link href="/" onClick={closeMobileMenu}>
            {t("nav.home")}
          </Link>
          <Link href="/courses" onClick={closeMobileMenu}>
            {t("nav.courses")}
          </Link>
          {!!courses?.length && (
            <div className={styles.drawerCourses}>
              <span>{t("nav.popularCourses")}</span>
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
            {t("nav.contacts")}
          </Link>
        </nav>

        <Box className={styles.drawerFooter}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              width: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                width: "auto",
              }}
            >
              <IconButton
                color={locale === "kz" ? "blue" : "default"}
                onClick={() => setLocale("kz")}
                style={{
                  width: "auto",
                }}
              >
                <Image src={kz} alt="KZ" width={25} height={25} />
              </IconButton>
              <IconButton
                color={locale === "ru" ? "blue" : "default"}
                onClick={() => setLocale("ru")}
                style={{
                  width: "auto",
                }}
              >
                <Image src={ru} alt="RU" width={25} height={25} />
              </IconButton>
            </Box>
            <a href="tel:+77052094540" className={styles.phone}>
              +7 705 209 4540
            </a>
          </Box>
          <ProfileButton />
        </Box>
      </Drawer>
    </header>
  );
}
