import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Stack, Typography } from "@mui/joy";
import React from "react";
import { Question } from "../../../../../../api-types";
import { QuestionForm } from "./QuestionForm";

export const QuestionView: React.FC<{ 
  question: Question; 
  index: number; 
  onSave: (index: number, question: Question) => void 
}> = ({
  question,
  index,
  onSave,
}) => {
  const [editing, setEditing] = React.useState(false);
  const handleSave = (question: Question) => {
    onSave(index, question);
    setEditing(false);
  }

  return editing 
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
        <Button endDecorator={<EditIcon />} onClick={()=>{setEditing(!editing)}} size="sm" >
        
          Modifica
        </Button>
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
