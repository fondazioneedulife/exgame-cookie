import { Button, Checkbox, Input } from '@mui/joy';
import React, { ChangeEvent, useState } from 'react';
import classes from '../exams.module.css';

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

  // Funzione per gestire il cambiamento del testo della domanda
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  // Funzione per gestire il cambiamento del testo delle risposte
  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
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
    if (questionText.trim() === '') {
      alert('La domanda non può essere vuota!');
      return;
    }

    // Controllo che tutte le risposte non siano vuote
    for (let answer of answers) {
      if (answer.text.trim() === '') {
        alert('Tutte le risposte devono essere compilate!');
        return;
      }
    }

    // Controllo che ci sia almeno una risposta corretta
    if (!answers.some((answer) => answer.isCorrect)) {
      alert('Devi selezionare almeno una risposta corretta!');
      return;
    }

    // Se tutto è valido, aggiungi la domanda
    const newQuestion = {
      questionText,
      answers: [...answers],
    };
    onAddQuestion(newQuestion);

    // Resetta il form
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
        <Input 
          placeholder="Inserisci domanda" 
          variant="soft" 
          size="sm" 
          value={questionText}
          onChange={handleQuestionChange}
        />
      </div>
      <div className={classes.container_answers}>
        <label>Risposte:</label>
        {answers.map((answer, index) => (
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
                color="success" 
                size="sm" 
                checked={answer.isCorrect}
                onChange={() => handleCorrectAnswerSelect(index)} 
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.confirm_btn}>
        <Button variant="outlined" size="sm" onClick={handleAddQuestion} >
          Conferma domanda
        </Button>
      </div>
    </div>
  );
};

export default QuestionComponent;