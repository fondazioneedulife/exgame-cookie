import { Table } from "@mui/joy";
import { EditButton } from "./examsButtons/EditButton";
import { SessionsButton } from "./examsButtons/SessionsButton";
import classes from "./exam.module.css";
import { AddButton } from "./examsButtons/AddButton";
import { ExamRow } from "./examRow";

export const Exams: React.FC = () => {
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
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
          <ExamRow title="Esame1" studentClass="Pixel"></ExamRow>
 
        </tbody>
      </Table>
    </>
  );
};
