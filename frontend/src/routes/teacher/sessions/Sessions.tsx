import { Stack, Table } from "@mui/joy";
import classes from "./sessions.module.css";
import { Pagination, Button } from "@mui/material";
import { SessionRow } from "./sessionComponents/SessionRow";
import { SessionsDone } from "./sessionComponents/SessionsDone";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

export const Sessions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.headerLayout}>
        <h1 style={{ padding: 0, margin: 0 }}>Sessioni di esame: </h1>
        <Button
          variant="outlined"
          onClick={() => navigate("exam/:id/sessions/add")}
        >
          Nuova Sessione
        </Button>
      </div>
      <Table aria-label="basic table">
        <h2>Sessioni da svolgere</h2>
        <tbody>
          <SessionRow teacherClass="Pixel" date="13 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="14 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="15 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="16 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="17 ottobre 2025"></SessionRow>
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

      <Table aria-label="basic table">
        <h2>Sessioni svolte</h2>
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
    </>
  );
};
