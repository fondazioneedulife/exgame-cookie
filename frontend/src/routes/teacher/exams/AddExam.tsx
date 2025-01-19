import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionForm } from "./examComponents/QuestionForm";
import { QuestionView } from "./examComponents/QuestionView";

interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  answers: Answer[];
}

const AddExam: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);

  const addQuestionToExam = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowQuestionForm(false); // Nasconde il form dopo aver aggiunto la domanda
  };

  const handleAddQuestionClick = () => {
    setShowQuestionForm(true); // Mostra il form per l'aggiunta di una nuova domanda
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Nome dell'esame</FormLabel>
          <Input placeholder="Che esame stai preparando?" />
        </FormControl>
        <FormControl>
          <FormLabel>Durata dell'esame</FormLabel>
          <Autocomplete
            options={["0:30h", "1:00h", "1:30h", "2:00h", "2:30h"]}
            placeholder="Inserisci il tempo massimo di svolgimento"
          />
        </FormControl>

        <Divider />

        <Typography>Questionario</Typography>
        <Stack spacing={2}>
          {questions.map((question, index) => (
            <QuestionView key={index} question={question} index={index} />
          ))}
          <Divider />
        </Stack>

        {showQuestionForm ? (
          <QuestionForm onAddQuestion={addQuestionToExam} />
        ) : (
          <Box>
            <Button
              onClick={handleAddQuestionClick}
              size="sm"
              // variant="outlined"
            >
              Aggiungi una domanda
            </Button>
          </Box>
        )}
      </Stack>

      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid>
          <Button size="md" variant="soft" onClick={() => navigate("/teacher")}>
            Annulla
          </Button>
        </Grid>
        <Grid>
          <Button size="md" onClick={() => navigate("/teacher")}>
            Salva
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddExam;
