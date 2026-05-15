import { Exo_2 } from "next/font/google";
import "./globals.css";

import { Providers } from "../providers";
import Header from "@/shared/ui/layout/header/Header";
import AuthModal from "@/features/auth/ui/AuthModal";

const exo2 = Exo_2({
  variable: "--font-exo-2",
});

export const metadata = {
  title: "CodZilla School — Онлайн школа программирования для детей",
  description:
    "CodZilla School — современная онлайн школа программирования для детей. Курсы по веб-разработке, логике и IT-навыкам с практикой и поддержкой.",
  keywords: [
    "программирование для детей",
    "онлайн школа программирования",
    "курсы программирования",
    "CodZilla School",
    "обучение IT детям",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${exo2.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <AuthModal />
          </Providers>
      </body>
    </html>
  );
}
