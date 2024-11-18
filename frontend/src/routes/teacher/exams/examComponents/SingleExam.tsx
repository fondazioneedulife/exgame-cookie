import React from 'react';
import { Button, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface SingleExamProps {
  id: string; // ID dell'esame
  name: string; // Nome dell'esame
  className: string; // Classe associata all'esame
  date: string; // Data dell'esame, utile per la navigazione
  onDelete: (id: string) => void; // Funzione per eliminare l'esame
}

const SingleExam: React.FC<SingleExamProps> = ({ id, name, className, date, onDelete }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{name}</td>
      <td>{className}</td>
      <td>
        <Stack direction="row" spacing={0.5} justifyContent={'flex-end'}>
          <Button size="sm" onClick={() => navigate(`/teacher/exam/${id}`)}>
            Modifica
          </Button>
          <Button variant="outlined" size="sm" onClick={() => navigate(`/teacher/subscriptions/${date}`)}>
            Sessioni
          </Button>
          <Button size="sm" style={{ backgroundColor: '#ab003c' }}onClick={() => onDelete(id)}>
            <DeleteRoundedIcon />
          </Button>
        </Stack>
      </td>
    </tr>
  );
};

export default SingleExam;