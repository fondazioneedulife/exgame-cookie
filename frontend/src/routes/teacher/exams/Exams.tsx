import Table from "@mui/joy/Table";
import Button from '@mui/joy/Button';
import { Stack } from "@mui/joy";


export const Exams: React.FC = () => {
  return (
  <>
  
    <Table aria-label="basic table">
      <thead >
          <Stack direction="row">
            <th>Lista esami</th>
            <Button >Nuovo esame</Button>
          </Stack>
        </thead>
       <tbody> 
        <tr>
          <td>Esame</td>
          <td>Classi</td>
          <td>Azioni</td>
        </tr>
      
        <tr>
          <td>React</td>
          <td>Classe E</td>
          <td>
            <Stack direction="row"  spacing={0.5}>
              <Button size="sm">Modifica</Button>
              <Button variant="outlined" size="sm">Sessioni</Button>
              </Stack>
          </td>
        </tr>
        <tr>
          <td>Javascript</td>
          <td>Classe B</td>
          <td>
            <Stack direction="row"  spacing={0.5}>
              <Button size="sm">Modifica</Button>
              <Button variant="outlined" size="sm">Sessioni</Button>
              </Stack>
          </td>
        </tr>
        <tr>
          <td>Node</td>
          <td>classe A</td>
          <td>
            <Stack direction="row"  spacing={0.5}>
              <Button size="sm">Modifica</Button>
              <Button variant="outlined" size="sm">Sessioni</Button>
              </Stack>
          </td>
        </tr>
      </tbody>
    </Table>


  </>);
};
