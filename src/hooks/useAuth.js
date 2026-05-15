import { useContext } from "react";
import { UserContext } from "@/features/auth/model/AuthProvider";

export const useAuth = () => {
  return useContext(UserContext);
};
