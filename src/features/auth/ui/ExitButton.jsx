import CustomModal from "@/shared/ui/modal/CustomModal";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";
import LogoutForm from "./Form/LogoutForm";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ExitButton() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <CustomModal
      openState={[open, setOpen]}
      trigger={
        <ListItemButton
          sx={{
            "& .MuiListItemText-primary": { color: "#ea3323" },
            marginTop: "auto",
          }}
        >
          <ListItemIcon>
            <Image
              src="/icons/profile/sidebar/exit.svg"
              alt="exit"
              width={18}
              height={18}
            />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItemButton>
      }
      title={"Выход"}
    >
      <LogoutForm onClose={handleLogout} />
    </CustomModal>
  );
}
