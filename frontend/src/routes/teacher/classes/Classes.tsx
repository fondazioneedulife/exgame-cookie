import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Pagination from "@mui/material/Pagination/Pagination";
import * as React from "react";
import { Link } from "react-router-dom";

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
                  <Link
                    to="/class-students"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Visualizza studenti
                  </Link>
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
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </>
    </>
  );
};  