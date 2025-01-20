import { Button, Stack, Table, Typography } from "@mui/joy";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Session } from "../../../../../api-types";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";
import { DataContext } from "../TeacherContext";
import { SessionRow } from "./sessionComponents/SessionRow";
import { SessionsDone } from "./sessionComponents/SessionsDone";

export const Sessions: React.FC = () => {
  const { id } = useParams();
  const { exams } = useContext(DataContext);
  const exam = exams?.find((exam) => exam._id === id);
  const navigate = useNavigate();
  const fetch = useFetch();
  const [sessions, setSessions] = useState<Session[]>();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/sessions/${id}`)
      .then((res) => res?.json())
      .then(setSessions)
      .catch(console.error);
  }, [id]);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h2">Sessioni di {exam?.name}: </Typography>
        <Button onClick={() => navigate("add")}>Nuova Sessione</Button>
      </Stack>

      <Typography level="h3" sx={{ marginTop: 4 }}>
        Sessioni da svolgere
      </Typography>
      <Table aria-label="basic table">
        <tbody>
          {sessions?.map((session) => (
            <SessionRow
              teacherClass={session.student_class}
              date={session.start_date.toString()}
            ></SessionRow>
          ))}
        </tbody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Box>

      <Typography level="h3" sx={{ marginTop: 4 }}>
        Sessioni svolte
      </Typography>
      <Table aria-label="basic table">
        <tbody>
          <SessionsDone
            teacherClass="Pixel"
            date="12 ottobre 2025"
          ></SessionsDone>
        </tbody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Box>
    </Stack>
  );
};
