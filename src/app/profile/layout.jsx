import Sidebar from "@/shared/ui/layout/sidebar/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="flex row gap-20">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
