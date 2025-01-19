import { Box, Button, Divider, Stack, Typography } from "@mui/joy";
import Pagination from "@mui/material/Pagination";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../TeacherContext";
import SingleExam from "./examComponents/SingleExam";

export const Exams: React.FC = () => {
  const navigate = useNavigate();

  const { exams } = useContext(DataContext);

  console.log("exams", exams);

  // Stato per gestire la pagina corrente
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 10; // Numero massimo di esami per pagina

  // Calcoliamo il numero totale di pagine
  const totalPages = exams ? Math.ceil(exams.length / examsPerPage) : 0;

  // Estraiamo gli esami per la pagina corrente
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams?.slice(indexOfFirstExam, indexOfLastExam);

  // Funzione per cambiare pagina
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // Funzione per eliminare un esame
  const handleDelete = (id: string) => {
    // const updatedExams = exams?.filter((exam) => exam.id !== id) || [];
    // setExams(updatedExams);
    // // Gestire l'eventualità che l'utente rimanga su una pagina vuota
    // const newTotalPages = Math.ceil(updatedExams.length / examsPerPage);
    // if (currentPage > newTotalPages) {
    //   setCurrentPage(newTotalPages);
    // }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h2">Esami</Typography>
        <Button onClick={() => navigate("/teacher/exam")}>Nuovo esame</Button>
      </Stack>
      <Stack spacing={1} divider={<Divider />}>
        {currentExams?.map((exam) => (
          <SingleExam
            key={exam._id}
            id={exam._id}
            name={exam.name}
            className={exam.classes.join(", ")}
            onDelete={handleDelete}
          />
        ))}
      </Stack>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};
