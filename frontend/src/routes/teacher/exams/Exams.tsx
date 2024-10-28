import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import React from "react";
import Chip from "@mui/joy/Chip";
import classes from "./Exams.module.css";

const ActionButton: React.FC = () => {
  return (
    <>
      <Button style={{ marginRight: "8px" }}>Modifica</Button>
      <Button>Sessioni</Button>
    </>
  );
};

export const Exams: React.FC = () => {
  return (
    <>
      <div className={classes.header}>
        <h1 style={{ margin: 0, padding: 0 }}>Esami</h1>
        <Button>Crea Esame</Button>
      </div>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Esame</th>
            <th>Classi</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NodeJs</td>
            <td>
              <Chip color="success">Cookie</Chip>
            </td>
            <td>
              <ActionButton />
            </td>
          </tr>
          <tr>
            <td>React</td>
            <td>
              <Chip color="success">Suse</Chip>
            </td>
            <td>
              <ActionButton />
            </td>
          </tr>
          <tr>
            <td>Mongo</td>
            <td>
              <Chip color="success">Pixel</Chip>
            </td>
            <td>
              <ActionButton />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
