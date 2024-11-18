import { Table, Typography, Button, Stack, Chip } from "@mui/joy";
import * as React from "react";
import Pagination from "@mui/material/Pagination";

export const Exams: React.FC = () => {
  return (
    <>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              <Typography level="h1">Esami</Typography>
            </th>
            <th>Classi</th>
            <th>Azioni</th>
            <th>
              <Button>Nuovo Esame</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node.js</td>
            <td>
              <div>
                <Stack direction="row" spacing={1}>
                  <Chip>Cookie</Chip>
                  <Chip>Pixel</Chip>
                </Stack>
              </div>
            </td>
            <td>
              {" "}
              <div>
                <Stack direction="row" spacing={1}>
                  <Button>Modifica</Button>
                  <Button>Sessioni</Button>
                </Stack>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
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
    </>
  );
};
