import * as React from 'react';
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

export const Exams: React.FC = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h1>Esami</h1>
        <Button>aggiungi esame</Button>
      </Stack>

      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Titolo</th>
            <th style={{ width: '40%' }}>Classi</th>
            <th style={{ width: '30%' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>React</td>
            <td>Cookie</td>
            <td>
              <Button style={{marginRight: "1rem"}}>modifica</Button>
              <Button>sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Mongo db</td>
            <td>Cookie, Pixel</td>
          <td>
              <Button style={{marginRight: "1rem"}}>modifica</Button>
              <Button>sessioni</Button>
            </td>
          </tr>
          <tr>
            <td>Cybersecurity</td>
            <td>Cookie, Suse,Pixel, Zorin</td>
          <td>
              <Button style={{marginRight: "1rem"}}>modifica</Button>
              <Button>sessioni</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
