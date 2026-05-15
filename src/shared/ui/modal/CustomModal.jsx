import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Drawer,
  Box,
} from "@mui/material";

import Close from "@/shared/assets/icons/close.svg";
import { useState, cloneElement } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

export default function CustomModal({
  trigger,
  title,
  children,
  actions,
  openState,
  onClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = Array.isArray(openState) && openState.length === 2;
  const open = isControlled ? openState[0] : internalOpen;
  const setOpen = isControlled ? openState[1] : setInternalOpen;
  const isMobile = useIsMobile();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const triggerWithProps = trigger
    ? cloneElement(trigger, { onClick: handleOpen })
    : null;

  return (
    <>
      {triggerWithProps}

      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              padding: "16px",
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box fontWeight="600">{title}</Box>
            <IconButton onClick={handleClose}>
              <Image src={Close} alt="Close" width={20} height={20} />
            </IconButton>
          </Box>

          <Box mt={2}>{children}</Box>

          {actions && <Box mt={2}>{actions}</Box>}
        </Drawer>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 4 }}>
            {title}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <Image src={Close} alt="Close" width={20} height={20} />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>{children}</DialogContent>

          {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
      )}
    </>
  );
}