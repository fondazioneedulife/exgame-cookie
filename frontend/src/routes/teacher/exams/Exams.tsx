import Table from "@mui/joy/Table";
import Button from '@mui/joy/Button';
import { Stack } from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import classes from './examComponents'
import SingleExam from './examComponents/SingleExam.tsx'



export const Exams: React.FC = () => {
  
  const navigate = useNavigate();

  return (
  <>
    <div className={classes.container}>
      <div className={classes.container_box}>
            
        <div className={classes.container_table}>
          <Button variant="outlined" size="sm" 
          onClick={() => navigate('/teacher/exam')}>Aggiungi esame</Button>
        </div>
        
        <div className={classes.container_table}>
          <Table aria-label="basic table">
            <thead >
              <tr>
                <th style={{ width: '40%' }}>Elenco esami</th>
                <th>Classe</th>
                <th>Modifica</th>
              </tr>
            </thead>

            <tbody> 
              
                <SingleExam/>
              
              
              <tr>
                <td>Javascript</td>
                <td>Classe B</td>
                <td>
                  <Stack direction="row"  spacing={0.5}>
                    <Button size="sm" onClick={() => navigate('/teacher/exam/:id')} >Modifica</Button>
                    <Button variant="outlined" size="sm" onClick={() => navigate('/teacher/subscriptions/:date')} >Sessioni</Button>
                    <Button size="sm" style={{backgroundColor: '#ab003c'}}><DeleteRoundedIcon /></Button>
                  </Stack>
                </td>
              </tr>
              <tr>
                <td>Node</td>
                <td>classe A</td>
                <td>
                  <Stack direction="row"  spacing={0.5}>
                    <Button size="sm" onClick={() => navigate('/teacher/exam/:id')} >Modifica</Button>
                    <Button variant="outlined" size="sm" onClick={() => navigate('/teacher/subscriptions/:date')} >Sessioni</Button>
                    <Button size="sm" style={{backgroundColor: '#ab003c'}}><DeleteRoundedIcon /></Button>
                  </Stack>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>

  </>);
};