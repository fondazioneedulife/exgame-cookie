import * as React from "react";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

export const Exams: React.FC = () => {
  return (
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
      <div>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </Stack>
      </div>
    </Table>
  );
};
