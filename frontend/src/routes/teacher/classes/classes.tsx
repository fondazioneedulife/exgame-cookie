import * as React from "react";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

export const Classes: React.FC = () => {
  return (
    <>
      <>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>
                <Typography level="h1">Le mie classi</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: "space-between",
                }}
                style={{ paddingTop: "1%" }}
              >
                <td style={{ width: "60%" }}>
                  <Typography level="h3">cookie</Typography>
                </td>
                <Button style={{ padding: "0 11% 0 11%" }}>
                  Visualizza studenti
                </Button>
              </Stack>
            </tr>
            <hr />

            <tr>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: "space-between",
                }}
                style={{ paddingTop: "1%" }}
              >
                <td style={{ width: "60%" }}>
                  <Typography level="h3">cookie</Typography>
                </td>
                <Button style={{ padding: "0 11% 0 11%" }}>
                  Visualizza studenti
                </Button>
              </Stack>
            </tr>
            <hr />
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
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            1
          </Button>
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            2
          </Button>
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            3
          </Button>
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            4
          </Button>
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            5
          </Button>
          <Button
            variant="solid"
            sx={{ borderRadius: "25%", backgroundColor: "primary" }}
          >
            ≻
          </Button>
        </Stack>
      </>
    </>
  );
};
