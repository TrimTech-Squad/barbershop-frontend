import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export type ToastProps = {
  severity: "success" | "error" | "info" | "warning";
  message: string;
};

const Toast = ({ severity, message }: ToastProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert sx={{ width: "100%" }} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
