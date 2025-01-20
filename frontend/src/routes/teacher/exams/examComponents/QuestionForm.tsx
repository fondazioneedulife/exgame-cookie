import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
} from "@mui/joy";
import React, { ChangeEvent, useState } from "react";
import { Answer, Question, QuestionType } from "../../../../../../api-types";

interface QuestionComponentProps {
  saveQuestion: (question: Question) => void;
  question?: Question;
}

export const QuestionForm: React.FC<QuestionComponentProps> = ({
  saveQuestion: handleSave,
  question = {
    text: "",
    questionType: QuestionType.SINGLE_CHOICE,
  }as Question,
}) => {
  const [questionState, setQuestionState] = useState<Question>(question);
  const setQuestionText = (text: string) =>
    setQuestionState((state) => ({ ...state, text: text }));

  const [answers, setAnswers] = useState<Answer[]>(question?.answers || [
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  // Funzione per gestire il cambiamento del testo della domanda
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  // Funzione per gestire il cambiamento del testo delle risposte
  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = text;
    setAnswers(newAnswers);
  };

  // Funzione per selezionare la risposta corretta
  const handleCorrectAnswerSelect = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(newAnswers);
  };

  // Funzione per aggiungere una nuova domanda
  const handleAddQuestion = () => {
    // Controllo che la domanda non sia vuota
    if (questionState.text.trim() === "") {
      alert("La domanda non può essere vuota!");
      return;
    }

    // Controllo che tutte le risposte non siano vuote
    for (const answer of answers) {
      if (answer.answer.trim() === "") {
        alert("Tutte le risposte devono essere compilate!");
        return;
      }
    }

    // Controllo che ci sia almeno una risposta corretta
    if (!answers.some((answer) => answer.isCorrect)) {
      alert("Devi selezionare almeno una risposta corretta!");
      return;
    }

    // Se tutto è valido, aggiungi la domanda
    const newQuestion: Question = {
      ...questionState,
      answers: [...answers],
    };
    handleSave(newQuestion);

    // Resetta il form
    setQuestionText("");
    setAnswers([
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ]);
  };

  return (
    <Card>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Domanda</FormLabel>
          <Input value={questionState.text} onChange={handleQuestionChange} />
        </FormControl>
        <Stack>
          <FormLabel>Risposte:</FormLabel>
          {answers.map(({ answer, isCorrect }, index) => (
            <ul key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid sm={10}>
                  <Input
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Risposta ${index + 1}`}
                  />
                </Grid>

                <Grid>
                  <Checkbox
                    label="Corretta"
                    color="success"
                    size="sm"
                    checked={isCorrect}
                    onChange={() => handleCorrectAnswerSelect(index)}
                  />
                </Grid>
              </Grid>
            </ul>
          ))}
          <Box>
            <Button variant="outlined" size="sm" onClick={handleAddQuestion}>
              Salva domanda
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};
