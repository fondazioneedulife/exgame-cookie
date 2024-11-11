import { Button, Checkbox, Input } from '@mui/joy';
import React, { ChangeEvent, useState } from 'react';
import classes from '../exams.module.css'


interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuestionComponentProps {
  onAddQuestion: (question: { questionText: string; answers: Answer[] }) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ onAddQuestion }) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerSelect = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText,
      answers: [...answers],
    };
    onAddQuestion(newQuestion);
    setQuestionText('');
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
  };

  return (
    <div className={classes.container_questions}>
      <div className={classes.container_answers}>
        <label>Domanda:</label>
        <Input placeholder="Inserisci domanda" variant="soft" size="sm" 
          value={questionText}
          onChange={handleQuestionChange}>
        </Input>
      </div>
      <div className={classes.container_answers}>
        <label>Risposte:</label>
        {answers.map((answer, index) => (
          <div >
            <div key={index} className={classes.answers}>
              <Input 
                variant="outlined" 
                size="sm"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Risposta ${index + 1}`}
              />
              
              <div className={classes.check}>
                <p>Corretta</p>
                <Checkbox
                    color="primary" 
                    size="sm" 
                    checked={answer.isCorrect}
                    onChange={() => handleCorrectAnswerSelect(index)} 
                  />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.confirm_btn}>
        <Button variant="outlined" size="sm" onClick={handleAddQuestion}>Conferma domanda</Button>
      </div>
    </div>
  );
};

export default QuestionComponent;