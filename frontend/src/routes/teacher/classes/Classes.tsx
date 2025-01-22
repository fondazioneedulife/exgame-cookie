import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Pagination from "@mui/material/Pagination/Pagination";
import * as React from "react";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";

export const Classes: React.FC = () => {
  const [classes, setClasses] = React.useState<string[]>([]);
  const fetch = useFetch();

  React.useEffect(() => {
    fetch(`${config.API_BASEPATH}/classes`)
      .then((res) => res?.json())
      .then(setClasses)
      .catch(console.error);
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h2">Le mie classi</Typography>
      </Stack>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Classe</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((teacherClass) => (
            <tr key={teacherClass}>
              <td style={{ width: "60%" }}>
                <Typography level="h3">{teacherClass}</Typography>
              </td>
              <td>
                <Button
                  component={Link}
                  to={`/teacher/classes/${teacherClass}`}
                >
                  Visualizza studenti
                </Button>
              </td>
            </tr>
          ))}
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
        <Pagination count={classes.length} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};
