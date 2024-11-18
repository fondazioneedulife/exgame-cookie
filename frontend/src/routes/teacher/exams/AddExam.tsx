import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { Divider, Table } from '@mui/joy';
import Input from '@mui/joy/Input';
import Autocomplete from '@mui/joy/Autocomplete';
import classes from './exams.module.css'
import QuestionComponent from './examComponents/QuestionComponent';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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

  const addQuestionToExam = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowQuestionForm(false); // Nasconde il form dopo aver aggiunto la domanda
  };

  const handleAddQuestionClick = () => {
    setShowQuestionForm(true); // Mostra il form per l'aggiunta di una nuova domanda
  };

  const handleModifyAnswer = (questionIndex: number, answerIndex: number) => {
    // Logica per rimuovere o modificare la risposta
    console.log(`Elimina risposta ${answerIndex} dalla domanda ${questionIndex}`);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_box}>
          <div className={classes.container_navbar}>
            <div>
              <Button variant="outlined" size="sm" onClick={() => navigate('/teacher')}>
                Annulla
              </Button>
            </div>
            <div>
              <Button size="sm" onClick={() => navigate('/teacher')} style={{background:"green"}}>
                Salva
              </Button>
            </div>

          </div>

          <div className={classes.container_table}>
            <Table aria-label="basic table">
              <thead>
                <tr>
                  <th>Esame:</th>
                  <th>
                    <Input placeholder="Inserisci nome esame…" variant="soft" size="sm" />
                  </th>
                </tr>
                <tr>
                  <td>Assegna alla classe:</td>
                  <td>
                    <Autocomplete
                      options={['Cookie', 'Pixel', 'Suse']}
                      placeholder="Seleziona classe..."
                      size="sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tempo massimo di svolgimento:</td>
                  <td>
                    <Input placeholder="Inserisci tempo limite…" variant="outlined" size="sm" />
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
                        <strong>{q.questionText || 'Domanda vuota'}</strong>
                        <ul className={classes.aswer_question}>
                          {q.answers.map((answer, idx) => (
                            <li 
                              key={idx}
                              style={{ color: answer.isCorrect ? 'green' : 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                              <span>
                                {answer.text || 'Risposta vuota'} {answer.isCorrect && '(Corretta)'}
                              </span>
                              
                              <Button variant="outlined" size="md" onClick={() => handleModifyAnswer(index, idx)}>
                                <DeleteRoundedIcon />
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <Divider />
                      </li>
                    ))}
                  </ul>
                </td>
                
              </tbody>
            </Table>

            <div className={classes.add_question}>
              <Button
                variant="plain"
                size="sm"
                style={{ width: '50%' }}
                onClick={handleAddQuestionClick}
              >
                Aggiungi domanda
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExam;