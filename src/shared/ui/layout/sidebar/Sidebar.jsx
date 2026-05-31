import SelectList from "./SelectList";
import { style } from "./SidebarStyle";

export default function Sidebar() {
  return (
    <div className="sidebar" style={style.sidebar}>
      <h2 style={style.title}>Личный кабинет</h2>
      <SelectList />
    </div>
  );
}
