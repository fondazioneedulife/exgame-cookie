import { Box, Divider, Stack, Typography } from "@mui/joy";
import { Chat } from "./components/Chat";
import { ConnectionSnackBar } from "./components/ConnectionSnackBar";
import { InfoPanel } from "./components/InfoPanel";
import { Questions } from "./components/Questions";
import { Title } from "./components/Title";

export const Play: React.FC<{ user: string }> = ({ user }) => {
  return (
    <Box>
      <Title user={user} />

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={2} direction="row">
        <Box sx={{ width: "65%" }}>
          <Typography level="h3">Live Exam</Typography>
          <Questions />
        </Box>

        <Divider orientation="vertical" />

        <Box sx={{ width: "35%" }}>
          <Typography level="h3">Chat</Typography>
          <Chat />
        </Box>
      </Stack>

      <Divider sx={{ mt: 4, mb: 2 }} />

      <Box>
        <Typography level="h4">Info</Typography>
        <InfoPanel />
      </Box>

      <ConnectionSnackBar />
    </Box>
  );
};
