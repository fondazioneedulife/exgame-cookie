import Table from '@mui/joy/Table';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';



export const Exams: React.FC = () => {
  return (
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Esame</th>
              <th>Classe</th>
              <th>Modifica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JavaScript</td>
              <td>Mouse</td>
              <td><Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: 'success.outlinedColor',
                    "&:hover":{backgroundColor: 'success.outlinedColor'}
                  }}>Sessioni</Button>
            </Stack></td>
            </tr>
            <tr>
              <td>HTML e CSS</td>
              <td>Cookie</td>
              <td><Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: 'success.outlinedColor',
                    "&:hover":{backgroundColor: 'success.outlinedColor'}
                  }}>Sessioni</Button>
            </Stack></td>
            </tr>
            <tr>
              <td>React</td>
              <td>Cookie</td>
              <td><Stack direction="row" spacing={1}>
                <Button>Modifica</Button>
                <Button
                  sx={{
                    backgroundColor: 'success.outlinedColor',
                    "&:hover":{backgroundColor: 'success.outlinedColor'}
                  }}>Sessioni</Button>
            </Stack></td>
            </tr>
          </tbody>
        </Table>
      );
    }