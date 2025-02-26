import { Person } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { User } from "../../../../../api-types/socketIo-types";
import { QuestionContext } from "../QuestionContext";
import { useSocketIoContext } from "../SocketContext";

export const InfoPanel: React.FC = () => {
  const { socketIo } = useSocketIoContext();
  const [users, setUsers] = useState<User[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const { questions } = useContext(QuestionContext);

  useEffect(() => {
    socketIo.current?.on("users", setUsers);

    return () => {
      socketIo.current?.off("users", setUsers);
    };
  }, []);

  useEffect(() => {
    socketIo.current?.on("totalMessages", setTotalMessages);

    return () => {
      socketIo.current?.off("totalMessages", setTotalMessages);
    };
  }, []);

  return (
    <Stack spacing={2} direction="row">
      <Box>
        <Typography>Persone connesse: {users.length}</Typography>
        <AccordionGroup>
          {users.map((user) => (
            <Accordion key={user.id}>
              <AccordionSummary>
                <ListItemDecorator>
                  <Person />
                </ListItemDecorator>
                {user.name}
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {user.responses?.map((response, i) => (
                    <ListItem key={i}>
                      <Typography>
                        {response.questionId}: {response.answer}{" "}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionGroup>
      </Box>
      <Box>
        <Typography>Messaggi inviati: {totalMessages}</Typography>
      </Box>
      <Box>
        <Typography>Domande risposte:</Typography>
        <List>
          {Object.entries(questions).map(([question, answer]) => (
            <ListItem key={question}>
              <Typography>
                {question}: {answer}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
};
