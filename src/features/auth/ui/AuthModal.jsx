"use client";

import { useListener } from "react-bus";
import { useState } from "react";
import CustomModal from "@/shared/ui/modal/CustomModal";
import AuthForm from "./Form/AuthForm";

export default function AuthModal() {
  const [open, setOpen] = useState(false);

  useListener("authModal:open", () => {
    setOpen(true);
  });

  return (
    <CustomModal
      title="CODZILLA"
      openState={[open, setOpen]}
      onClose={() => setOpen(false)}
    >
      <AuthForm onSuccess={() => setOpen(false)} />
    </CustomModal>
  );
}
