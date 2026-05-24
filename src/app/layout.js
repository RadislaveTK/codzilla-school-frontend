import {Exo_2} from "next/font/google";
import "./globals.css";

import {Providers} from "../providers";
import Header from "@/shared/ui/layout/header/Header";
import AuthModal from "@/features/auth/ui/AuthModal";
import Footer from "@/shared/ui/layout/footer/Footer";
import {defaultMetadata} from "@/shared/config/seo/seo";

const exo2 = Exo_2({
  variable: "--font-exo-2",
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${exo2.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <AuthModal />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
