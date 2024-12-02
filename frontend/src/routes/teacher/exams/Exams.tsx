
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import classes from './exams.module.css'
import { useState } from 'react';
import SingleExam from './examComponents/SingleExam';
import Pagination from '@mui/material/Pagination';


export const Exams: React.FC = () => {
  const navigate = useNavigate();

  // Stato per gestire la lista degli esami
  const [exams, setExams] = useState([
    { id: '1', name: 'Javascript', className: 'Classe B', date: '2024-11-15' },
    { id: '2', name: 'Node', className: 'Classe A', date: '2024-12-01' },
    { id: '3', name: 'React', className: 'Classe C', date: '2024-12-02' },
    { id: '4', name: 'HTML', className: 'Classe D', date: '2024-12-03' },
    { id: '5', name: 'CSS', className: 'Classe E', date: '2024-12-04' },
    { id: '6', name: 'Python', className: 'Classe F', date: '2024-12-05' },
    { id: '7', name: 'Django', className: 'Classe G', date: '2024-12-06' },
    { id: '8', name: 'Flask', className: 'Classe H', date: '2024-12-07' },
    { id: '9', name: 'SQL', className: 'Classe I', date: '2024-12-08' },
    { id: '10', name: 'MongoDB', className: 'Classe J', date: '2024-12-09' },
    { id: '11', name: 'Java', className: 'Classe K', date: '2024-12-10' },
    { id: '12', name: 'C++', className: 'Classe L', date: '2024-12-11' },
    // Altri esami possono essere aggiunti qui
  ]);

  // Stato per gestire la pagina corrente
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 10; // Numero massimo di esami per pagina

  // Calcoliamo il numero totale di pagine
  const totalPages = Math.ceil(exams.length / examsPerPage);

  // Estraiamo gli esami per la pagina corrente
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

  // Funzione per cambiare pagina
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Funzione per eliminare un esame
  const handleDelete = (id: string) => {
    const updatedExams = exams.filter(exam => exam.id !== id);
    setExams(updatedExams);

    // Gestire l'eventualità che l'utente rimanga su una pagina vuota
    const newTotalPages = Math.ceil(updatedExams.length / examsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
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
                {/* Mappiamo ogni esame visibile sulla pagina corrente */}
                {currentExams.map(exam => (
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

            {/* Componente Pagination dinamico */}
            
          </div>
          
          </div>
          <div className={classes.pagination}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
            />
        </div>
      </div>
    </>
  );
};
