import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useBus } from "react-bus";

export default function ProfileButton() {
  const { user } = useAuth();
  const bus = useBus();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      // Логика для перехода в личный кабинет
      router.push("/profile");
    } else {
      // Логика для открытия формы входа
      bus.emit("authModal:open");
    }
  };

  return (
    <Button variant="contained" color="blue" sx={{
      color: "#fff",
      padding: "16px 20px",
    }} onClick={handleClick}>
      {user ? `Личный кабинет` : "Войти"}
    </Button>
  );
}
