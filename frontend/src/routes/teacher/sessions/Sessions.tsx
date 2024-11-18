import { Stack, Table } from "@mui/joy";
import { AddButton } from "../exams/examsButtons/AddButton";
import classes from "./sessions.module.css";
import { Pagination } from "@mui/material";

export const Sessions: React.FC = () => {
  return (
    <>
      <div className={classes.headerLayout}>
        <h1 style={{ padding: 0, margin: 0 }}>Esami</h1>
        <AddButton></AddButton>
      </div>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Esami</th>
            <th style={{ width: "40%" }}>Classi</th>
            <th style={{ width: "40%" }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {/* <SessionRow title="Esame1" teacherClasses="Pixel"></SessionRow> */}
        </tbody>
      </Table>
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack>
    </>
  );
};
