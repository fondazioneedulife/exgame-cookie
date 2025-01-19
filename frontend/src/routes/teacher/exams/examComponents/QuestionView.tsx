import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Stack, Typography } from "@mui/joy";
import React from "react";
import { Question } from "../AddExam";

export const QuestionView: React.FC<{ question: Question; index: number }> = ({
  question,
  index,
}) => {
  return (
    <Card>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>
          {index + 1}) {question.questionText || "Domanda vuota"}
        </Typography>
        <Button endDecorator={<EditIcon />} size="sm">
          {/* TODO add edit question functionality  */}
          Modifica
        </Button>
      </Stack>
      <ul>
        {question.answers.map((answer, i) => (
          <li
            key={i}
            style={{
              color: answer.isCorrect ? "green" : "black",
            }}
          >
            {answer.text || "Risposta vuota"} {answer.isCorrect && "(Corretta)"}
          </li>
        ))}
      </ul>
    </Card>
  );
};
