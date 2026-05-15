"use client";

import logo from "@/shared/assets/icons/logo.svg";
import kz from "@/shared/assets/icons/kz.svg";
import ru from "@/shared/assets/icons/ru.svg";
import phone from "@/shared/assets/icons/phone.svg";

import styles from "./Header.module.css";

import { Box, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CourseMenu from "./CourseMenu";
import ProfileButton from "@/features/auth/ui/ProfileButton";

export default function Header() {
  return (
    <header className={`${styles.header} flex row ai-center jc-space-between`}>
      <Box className="flex row ai-center gap-20">
        <Link href="/" className="flex row ai-center gap-4">
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h3 className={styles.title}>CODZILLA</h3>
        </Link>

        <Box className="flex row ai-center gap-20">
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
        </Box>
      </Box>

      <Box className="flex row ai-center gap-20">
        <Link href="/">Главная</Link>
        {/* <Link href="/about">Курсы</Link> */}
        <CourseMenu />
        <Link href="/about">Контакты</Link>
      </Box>

      <Box className="flex row ai-center gap-66">
        <Box className="flex row ai-center gap-6">
          <Image src={phone} alt="Phone" width={20} height={20} />
          <a href="tel:+77052094540" className={styles.phone}>
            +7 705 209 4540
          </a>
        </Box>
        <ProfileButton />
      </Box>
    </header>
  );
}
