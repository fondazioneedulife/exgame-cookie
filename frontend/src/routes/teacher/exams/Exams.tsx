import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';

export const Exams: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>ESAMI</h2>
        <Button onClick={() => {}}>Nuovo esame</Button>
      

      </div>
      
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Esami</th>
            <th>Classi</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Matematica</td>
            <td><Chip>Suse</Chip></td>
            <td>
              <Button onClick={() => {}} style={{ marginRight: '10px' }}>Modifica</Button>
              <Button onClick={() => {}}>Sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Scienze</td>
            <td><Chip>Cookie</Chip></td>
            <td>
              <Button onClick={() => {}} style={{ marginRight: '10px' }}>Modifica</Button>
              <Button onClick={() => {}}>Sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Scienze</td>
            <td><Chip>Pixel</Chip></td>
            <td>
              <Button onClick={() => {}} style={{ marginRight: '10px' }}>Modifica</Button>
              <Button onClick={() => {}}>Sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Scienze</td>
            <td><Chip>Mouse</Chip></td>
            <td>
              <Button onClick={() => {}} style={{ marginRight: '10px' }}>Modifica</Button>
              <Button onClick={() => {}}>Sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Scienze</td>
            <td><Chip>Samba</Chip></td>
            <td>
              <Button onClick={() => {}} style={{ marginRight: '10px' }}>Modifica</Button>
              <Button onClick={() => {}}>Sessioni</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
