import { Stack, Table } from "@mui/joy";
import classes from "./sessions.module.css";
import { Pagination, Button } from "@mui/material";
import { SessionRow } from "./sessionComponents/SessionRow";
import {SessionsDone} from "./sessionComponents/SessionsDone";

export const Sessions: React.FC = () => {
  return (
    <>
      <div className={classes.headerLayout}>
        <h1 style={{ padding: 0, margin: 0 }}>Sessioni di esame: </h1>
        <Button variant="outlined" >Nuova Sessione</Button>
      </div>
      <Table aria-label="basic table">
     <h2>Sessioni da svolgere</h2>
        <tbody>
          <SessionRow teacherClass="Pixel" date="12 ottobre 2025"></SessionRow>
        </tbody>
      </Table>
    
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack> 
      <Table aria-label="basic table">
     <h2>Sessioni svolte</h2>
        <tbody>
          <SessionsDone teacherClass="Pixel" date="12 ottobre 2025"></SessionsDone>
        </tbody>
      </Table>
    
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack> 
    
    </>
  );
};
