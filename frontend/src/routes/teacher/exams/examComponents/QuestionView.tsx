import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Stack, Typography } from "@mui/joy";
import React from "react";
import { Question } from "../../../../../../api-types";
import { QuestionForm } from "./QuestionForm";

export const QuestionView: React.FC<{ 
  question: Question; 
  index: number; 
  onSave:(index:number, question: Question)=>void
}> = ({
  question,
  index,
  onSave, //funzione che viene richiamata quando viene salvato un cambiamento nella domanda
}) => {
  const [editing, setEditing] = React.useState(false);
  const handleSave = (question: Question) => {
    onSave(index, question);
    setEditing(false); // quando si salva la domanda, nascondi il form di modifica
  }

  return editing 
  ? <QuestionForm //se variabile editing=true mostro QuestionForm, altrimenti Card e il resto
  saveQuestion={handleSave}
  question={question}
  />
  :(//se siamo in editing, quindi abbiamo cliccato sul bottone modifica, mostra il form per modificare, altrimenti mostra tutte le domande
    <Card>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>
          {index + 1}) {question.text || "Domanda vuota"}
        </Typography>
        <Button endDecorator={<EditIcon />} onClick={()=>{setEditing(!editing)}} size="sm">{/*} Onclick cambio il valore di editing, da false a true, per mostrare il form di modifica*/}
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
