import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Stack, Typography } from "@mui/joy";
import React from "react";
import { Question } from "../../../../../../api-types";
import { QuestionForm } from "./QuestionForm";

export const QuestionView: React.FC<{
  question: Question;
  index: number;
  onSave: (index: number, question: Question) => void;
  onDelete: (index: number) => void;
  isEditingQuestion: number | false;
  setIsEditingQuestion: (isEditingQuestion: number | false) => void;
}> = ({
  question,
  index,
  onSave, //funzione che viene richiamata quando viene salvato un cambiamento nella domanda
  onDelete,
  isEditingQuestion,
  setIsEditingQuestion,
}) => {
  const handleSave = (question: Question) => {
    onSave(index, question);
    setIsEditingQuestion(false); // quando si salva la domanda, nascondi il form di modifica
  };
  return isEditingQuestion === index ? (
    //se variabile editing=true mostro QuestionForm, altrimenti Card e il resto
    <QuestionForm saveQuestion={handleSave} question={question} />
  ) : (
    //se siamo in editing, quindi abbiamo cliccato sul bottone modifica, mostra il form per modificare, altrimenti mostra tutte le domande
    <Card>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>
          {index + 1}) {question.text || "Domanda vuota"}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
          <Button
            disabled={isEditingQuestion !== false}
            endDecorator={<EditIcon />}
            onClick={() => {
              // Onclick cambio il valore di editing, da false all'indice della domanda che viene modificata, per mostrare il form di modifica
              setIsEditingQuestion(index);
            }}
            size="sm"
          >
            Modifica
          </Button>
          <Button
            endDecorator={<DeleteIcon />}
            onClick={() => {
              if (window.confirm("Vuoi eliminare la domanda?")) {
                onDelete(index);
              }
            }}
            size="sm"
          >
            Elimina
          </Button>
        </Stack>
      </Stack>
      <ul>
        {question.answers.map(({ answer, isCorrect }, i) => (
          <li
            key={i}
            style={{
              color: isCorrect ? "green" : "black",
            }}
          >
            {answer || "Risposta vuota"} {isCorrect && "(Corretta)"}
          </li>
        ))}
      </ul>
    </Card>
  );
};
