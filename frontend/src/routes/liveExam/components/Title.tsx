import { Box, Chip, Stack, Typography } from "@mui/joy";
import React from "react";
import { useSocketIoContext } from "../SocketContext";

export const Title: React.FC<{ user: string }> = ({ user }) => {
  const { connected } = useSocketIoContext();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography level="h2">Benvenuto {user}</Typography>
      </Box>
      <Box>
        <Chip color={connected ? "success" : "neutral"}>
          {connected ? "Connected" : "Not connected"}
        </Chip>
      </Box>
    </Stack>
  );
};
function useSocketContext(): { connected: any } {
  throw new Error("Function not implemented.");
}
