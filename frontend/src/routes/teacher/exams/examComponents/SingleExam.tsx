import { Edit } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Stack, Tooltip } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SingleExamProps {
  id: string; // ID dell'esame
  name: string; // Nome dell'esame
  className?: string; // Classe associata all'esame
  date?: string; // Data dell'esame, utile per la navigazione
  onDelete: (id: string) => void; // Funzione per eliminare l'esame
}

const SingleExam: React.FC<SingleExamProps> = ({
  id,
  name,
  className,
  date,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid sm={4}>{name}</Grid>
      <Grid sm={4}>{className}</Grid>
      <Grid sm={4}>
        <Stack direction="row" spacing={0.5} justifyContent={"flex-end"}>
          <Tooltip title="Modifica">
            <IconButton
              size="sm"
              onClick={() => navigate(`/teacher/exam/${id}`)}
              aria-label="Modifica"
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizza le sessioni">
            <IconButton
              size="sm"
              onClick={() => navigate(`/teacher/subscriptions/${date}`)}
            >
              <CalendarMonthIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Elimina">
            <IconButton
              size="sm"
              style={{ backgroundColor: "#ab003c", color: "white" }}
              onClick={() => onDelete(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SingleExam;
