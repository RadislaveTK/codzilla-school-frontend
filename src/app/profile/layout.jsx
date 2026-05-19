import Sidebar from "@/shared/ui/layout/sidebar/Sidebar";
import styles from "./Profile.module.css";

export default function ProfileLayout({ children }) {
  return (
    <div className={`${styles.pageProfile} flex row gap-20 w-100`}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
