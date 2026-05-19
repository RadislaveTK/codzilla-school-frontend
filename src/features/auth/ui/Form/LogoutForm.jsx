import { Box, Button } from "@mui/material";

export default function LogoutForm({onClose}) {
  return (
    <div>
      <h2>Вы уверены, что хотите выйти?</h2>
      <Box>
        <Button variant="contained" color="error" onClick={onClose}>
          Да, выйти
        </Button>
      </Box>
    </div>
  );
}
