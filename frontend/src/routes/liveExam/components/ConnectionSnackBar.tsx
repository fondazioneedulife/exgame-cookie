import { Snackbar } from "@mui/joy";
import { useState } from "react";
import { useSocketIoContext } from "../SocketContext";

export const ConnectionSnackBar: React.FC = () => {
  const { connected } = useSocketIoContext();
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      autoHideDuration={3000}
      open={open}
      color={connected ? "success" : "danger"}
      variant="soft"
      onClose={() => {
        setOpen(false);
      }}
    >
      {connected ? "Connected" : "Not connected"}
    </Snackbar>
  );
};
