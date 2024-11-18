import Table from "@mui/joy/Table";
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import classes from './exams.module.css'
import { useState } from 'react';
import SingleExam from './examComponents/SingleExam';
import Pagination from '@mui/material/Pagination';
import { Stack } from "@mui/joy";

export const Exams: React.FC = () => {
  const navigate = useNavigate();

  // Stato per gestire la lista degli esami
  const [exams, setExams] = useState([
    { id: '1', name: 'Javascript', className: 'Classe B', date: '2024-11-15' },
    { id: '2', name: 'Node', className: 'Classe A', date: '2024-12-01' },
    { id: '3', name: 'Node', className: 'Classe A', date: '2024-12-01' },
    { id: '4', name: 'Node', className: 'Classe A', date: '2024-12-01' },

    // Altri esami possono essere aggiunti qui
  ]);

  // Funzione per eliminare un esame
  const handleDelete = (id: string) => {
    const updatedExams = exams.filter(exam => exam.id !== id);
    setExams(updatedExams);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_box}>

          <div className={classes.container_table}>
            <Table aria-label="basic table">
              <thead >
                <tr>
                  <th style={{ width: '40%', fontSize:"1.5em" }}>Esami</th>
                  <th></th>
                  <th> 
                    <Stack direction="row" spacing={0.5} justifyContent={'flex-end'}>
                      <Button variant="outlined" size="md" onClick={() => navigate('/teacher/exam')}>Aggiungi esame</Button>
                    </Stack>
                  </th>
                </tr>
              </thead>
              <br />
              <tbody>
                {/* Mappiamo ogni esame e lo passiamo al componente SingleExam */}
                {exams.map(exam => (
                  <SingleExam
                    key={exam.id}
                    id={exam.id}
                    name={exam.name}
                    className={exam.className}
                    date={exam.date}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </Table>

            <div className={classes.pagination}>
              <Pagination count={10} />
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};