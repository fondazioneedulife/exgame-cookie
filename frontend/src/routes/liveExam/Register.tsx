import { Button, Input, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useSocketIoContext } from "./SocketContext";

export const Register: React.FC<{
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ setUser }) => {
  const { socketIo } = useSocketIoContext();
  const [name, setName] = useState("");

  const handleClick = () => {
    socketIo.current?.emit("register", name);
    setUser(name);
  };

  return (
    <Stack spacing={2}>
      <Typography level="h2">Registrati all'esame</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <Stack spacing={2} direction="row">
          <Input
            variant="soft"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleClick}>Registrati</Button>
        </Stack>
      </form>
    </Stack>
  );
};
