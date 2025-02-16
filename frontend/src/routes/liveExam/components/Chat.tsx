import { Face, Send } from "@mui/icons-material";
import { Box, Chip, IconButton, Stack, Textarea } from "@mui/joy";
import { useEffect, useState } from "react";
import { Message } from "../../../../../api-types/socketIo-types";
import { useSocketIoContext } from "../SocketContext";

export const Chat: React.FC = () => {
  const { socketIo } = useSocketIoContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socketIo.current?.on("message", setMessages);

    return () => {
      socketIo.current?.off("message", setMessages);
    };
  }, []);

  const hancleSend = () => {
    socketIo.current?.emit("message", newMessage);
    setNewMessage("");
  };

  return (
    <Stack sx={{ mt: 4 }}>
      {messages.map((msg, i) => (
        <Box
          key={i}
          sx={{
            p: 1,
            backgroundColor: "neutral.100",
            borderRadius: 8,
            mb: 3,
            position: "relative",
          }}
        >
          <Chip
            startDecorator={<Face sx={{ fontSize: "sm" }} />}
            sx={{
              backgroundColor: "neutral.500",
              color: "neutral.100",
              position: "absolute",
              top: -18,
              left: -10,
            }}
          >
            {msg.user?.name}
          </Chip>
          {msg.text}
        </Box>
      ))}
      <Stack spacing={2} direction="row">
        <Textarea
          variant="soft"
          placeholder="Scrivi un messaggio..."
          sx={{ flexGrow: 2 }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconButton onClick={hancleSend}>
          <Send />
        </IconButton>
      </Stack>
    </Stack>
  );
};
