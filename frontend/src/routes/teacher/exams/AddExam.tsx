import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { Autocomplete, Divider, Table } from '@mui/joy';
import Input from '@mui/joy/Input';
import classes from './exams.module.css';
import QuestionComponent from './examComponents/QuestionComponent';

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answers: Answer[];
}

const AddExam: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [hideButton, setHideButton] = useState<boolean>(false); // Nuovo stato per nascondere il pulsante

  const addQuestionToExam = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowQuestionForm(false); // Nasconde il form dopo aver aggiunto la domanda
    setHideButton(false); // Riporta visibile il pulsante dopo aver aggiunto una domanda
  };

  const handleAddQuestionClick = () => {
    setShowQuestionForm(true); // Mostra il form per l'aggiunta di una nuova domanda
    setHideButton(true); // Nasconde il pulsante
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_box}>
          <div className={classes.container_navbar}>
            <div>
              <Button variant="outlined" size="sm" onClick={() => navigate('/teacher')} style={{ width: '80px' }}>
                Annulla
              </Button>
            </div>
            <div>
              <Button variant="outlined" size="sm" onClick={() => navigate('/teacher')} style={{ width: '80px' }}>
                Salva
              </Button>
            </div>
          </div>

          <div className={classes.container_table}>
            <Table aria-label="basic table" className={classes.table}>
              <thead>
                <tr>
                  <th>Esame:</th>
                  <th>
                    <Input placeholder="Inserisci nome esame…" variant="soft" size="sm" />
                  </th>
                </tr>
                <tr>
                  <td>Tempo massimo di svolgimento:</td>
                  <td>
                    <Autocomplete
                        options={['0:30h', '1:00h', '1:30h', '2:00h', '2:30h']}
                        placeholder="tempo massimo..."
                        size="sm"
                    />                  
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={2}>
                    <strong>Domande e risposte:</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {/* Mostra il componente QuestionComponent solo se showQuestionForm è true */}
                    {showQuestionForm && <QuestionComponent onAddQuestion={addQuestionToExam} />}
                  </td>
                </tr>
              
                <td colSpan={2}>
                  <ul className={classes.list_questions}>
                    {questions.map((q, index) => (
                      <li key={index} className={classes.list_questions_li}>
                        <strong>{index + 1}) {q.questionText || 'Domanda vuota'}</strong> {/* Aggiunto il numero progressivo */}
                        <ul className={classes.aswer_question}>
                          {q.answers.map((answer, idx) => (
                            <li 
                              key={idx}
                              style={{ color: answer.isCorrect ? 'green' : 'black' }}
                            >
                              {answer.text || 'Risposta vuota'} {answer.isCorrect && '(Corretta)'}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <Divider />
                  </ul>
                </td>

              </tbody>
            </Table>
          </div>

          <div className={classes.add_question}>
            {!hideButton && (
              <Button
                variant="plain"
                size="sm"
                style={{ width: '50%' }}
                onClick={handleAddQuestionClick}
              >
                Aggiungi domanda
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExam;