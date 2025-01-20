import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Stack, Typography } from "@mui/joy";
import React from "react";
import { Question } from "../../../../../../api-types";
import { QuestionForm } from "./QuestionForm";
import DeleteIcon from '@mui/icons-material/Delete';

export const QuestionView: React.FC<{ 
  question: Question; 
  index: number; 
  onSave: (index: number, question: Question) => void 
  onDelete: (index: number) => void
  isEditingQuestion: number | false;
  setIsEditingQuestion: (isEditingQuestion:number | false) => void
}> = ({
  question,
  index,
  onSave,
  onDelete,
  isEditingQuestion,
  setIsEditingQuestion
}) => {
  const handleSave = (question: Question) => {
    onSave(index, question);
    setIsEditingQuestion(false);
  }
  return isEditingQuestion===index 
  ?  <QuestionForm 
    saveQuestion={ handleSave } 
    question={question} 
    />
  : (
    <Card>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>
          {index + 1}) {question.text || "Domanda vuota"}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
          <Button disabled={isEditingQuestion !== false} endDecorator={<EditIcon />} onClick={()=>{setIsEditingQuestion(index)}} size="sm" >
            Modifica
          </Button>
          <Button endDecorator={<DeleteIcon />} onClick={()=>{if(window.confirm("Vuoi eliminare la domanda?")){onDelete(index)}}} size="sm" >
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
