import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import { useNavigate } from "react-router";

export const Exams: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/teacher/exam")}>Aggiungi esame</Button>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Esame</th>
            <th>Classe</th>
            <th>Gestione esame</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JavaScript</td>
            <td>Mouse</td>
            <td>
              <Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "darkgreen" },
                  }}
                  onClick={() => navigate("/teacher/exam/1/sessions")}
                >
                  Sessioni
                </Button>
              </Stack>
            </td>
          </tr>
          <tr>
            <td>HTML e CSS</td>
            <td>Cookie</td>
            <td>
              <Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "darkgreen" },
                  }}
                >
                  Sessioni
                </Button>
              </Stack>
            </td>
          </tr>
          <tr>
            <td>React</td>
            <td>Cookie</td>
            <td>
              <Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "darkgreen" },
                  }}
                >
                  Sessioni
                </Button>
              </Stack>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
