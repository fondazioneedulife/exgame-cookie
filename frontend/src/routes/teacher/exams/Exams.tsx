import {
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  Table,
  Typography,
} from "@mui/joy";

const ActionButtons: React.FC = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button>Modifica</Button>
      <Button>Sessioni</Button>
    </Stack>
  );
};

const Pagination: React.FC = () => (
  <List
    orientation="horizontal"
    sx={{
      alignContent: "center",
      justifyContent: "center",
      marginTop: 4,
      gap: 1,
    }}
  >
    <ListItem variant="solid" sx={{ borderRadius: 8 }}>
      1
    </ListItem>
    <ListItem variant="outlined" sx={{ borderRadius: 8 }}>
      2
    </ListItem>
    <ListItem variant="outlined" sx={{ borderRadius: 8 }}>
      3
    </ListItem>
    <ListItem variant="outlined" sx={{ borderRadius: 8 }}>
      4
    </ListItem>
  </List>
);

export const Exams: React.FC = () => {
  return (
    <Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Typography level="h1">Esami</Typography>
        <Button>Nuovo esame</Button>
      </Stack>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Esame</th>
            <th>Classi</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node.js</td>
            <td>
              <Chip>Cookie</Chip>
            </td>
            <td>
              <ActionButtons />
            </td>
          </tr>
          <tr>
            <td>React</td>
            <td>
              <Chip>Cookie</Chip> <Chip>Pixel</Chip>
            </td>
            <td>
              <ActionButtons />
            </td>
          </tr>
          <tr>
            <td>Mongo</td>
            <td>
              <Chip>Cookie</Chip>
            </td>
            <td>
              <ActionButtons />
            </td>
          </tr>
        </tbody>
      </Table>
      <Pagination />
    </Stack>
  );
};
