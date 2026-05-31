import Sidebar from "@/shared/ui/layout/sidebar/Sidebar";
import styles from "./Profile.module.css";

export const metadata = {
  title: "Личный кабинет — Codzilla School",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({ children }) {
  return (
    <div className={`${styles.pageProfile} profileScope flex row gap-20 w-100`}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
