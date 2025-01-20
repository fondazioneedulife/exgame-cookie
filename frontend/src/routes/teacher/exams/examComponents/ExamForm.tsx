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
import { Exam, Question } from "../../../../../../api-types";
import { QuestionForm } from "./QuestionForm";
import { QuestionView } from "./QuestionView";

type TExamForm = {
  exam?: Exam;
  onSave?: (exam: Exam) => void;
};

export const ExamForm: React.FC<TExamForm> = ({
  exam: initialState = { name: "", max_time: "" } as Exam,
  onSave = () => {},
}) => {
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam>(initialState);
  const [questions, setQuestions] = useState<Question[]>(
    initialState.questions || [],
  );
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);

  const addQuestionToExam = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowQuestionForm(false); // Nasconde il form dopo aver aggiunto la domanda
  };

  const editQuestion = (index: number, newQuestion: Question) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[index] = newQuestion;
      return newQuestions;
    });
  }

  const toggleQuestionForm = () => {
    setShowQuestionForm(true); // Mostra il form per l'aggiunta di una nuova domanda
  };

  const saveExam = () => {
    const newExam: Exam = { ...exam, questions: questions };
    onSave(newExam);
  };

  return (
    <Stack spacing={2}>
      <Typography level="h2">
        {exam.name ? `Esame di ${exam.name}` : "Nuovo esame"}
      </Typography>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Nome dell'esame</FormLabel>
          <Input
            placeholder="Che esame stai preparando?"
            value={exam.name}
            onChange={(e) =>
              setExam((exam) => ({ ...exam, name: e.target.value }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Durata dell'esame</FormLabel>
          <Autocomplete
            options={["", "0:30h", "1:00h", "1:30h", "2:00h", "2:30h"]}
            placeholder="Inserisci il tempo massimo di svolgimento"
            value={exam.max_time}
            onChange={(e, newValue) =>
              setExam((exam) => ({ ...exam, max_time: newValue || "" }))
            }
          />
        </FormControl>

        <Divider />

        <Typography level="h4">Questionario</Typography>
        <Stack spacing={2}>
          {questions.map((question, index) => (
            <QuestionView key={index} question={question} onSave={editQuestion}  index={index} />
          ))}
          <Divider />
        </Stack>

        {showQuestionForm ? (
          <QuestionForm saveQuestion={addQuestionToExam} />
        ) : (
          <Box>
            <Button
              onClick={toggleQuestionForm}
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
          <Button size="md" onClick={saveExam}>
            Salva
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};
