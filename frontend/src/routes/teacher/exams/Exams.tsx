import { Stack, Table } from "@mui/joy";
import classes from "./exam.module.css";
import { AddExam } from "./examsButtons/AddExam";
import { ExamRow } from "./ExamRow";
import Pagination from "@mui/material/Pagination";

export const Exams: React.FC = () => {
  return (
    <>
      <div className={classes.headerLayout}>
        <h1 style={{ padding: 0, margin: 0 }}>Esami</h1>
        <AddExam></AddExam>
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
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
          <ExamRow title="Esame1" teacherClasses="Pixel"></ExamRow>
        </tbody>
      </Table>
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack>
    </>
  );
};
