import CustomModal from "@/shared/ui/modal/CustomModal";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";
import LogoutForm from "./Form/LogoutForm/LogoutForm";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/config/i18n";

export default function ExitButton() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const { t } = useI18n();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
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
          <ListItemText primary={t("profile.logout")} />
        </ListItemButton>
      }
      title={t("profile.logout")}
    >
      <LogoutForm onClose={handleLogout} />
    </CustomModal>
  );
}
