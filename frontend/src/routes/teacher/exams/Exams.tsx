import { Table, Typography, Button, Stack, Chip } from "@mui/joy";

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
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          1
        </Button>
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          2
        </Button>
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          3
        </Button>
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          4
        </Button>
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          5
        </Button>
        <Button
          variant="solid"
          sx={{ borderRadius: "50%", backgroundColor: "primary" }}
        >
          6
        </Button>
      </Stack>
    </>
  );
};
