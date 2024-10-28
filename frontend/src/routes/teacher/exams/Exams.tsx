import { Button, Table } from "@mui/joy";

export const Exams: React.FC = () => {
  return (
    <>
    <h1>Exams</h1>
    <Button>Aggiungi Esame</Button>
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Esami</th>
          <th></th>
          <th>corsi</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>esame1</td>
          <td>classe1, classe2</td>
          <td><Button>Modifica</Button></td>
          <td><Button>Sessioni</Button></td>
        </tr>
        <tr>
          <td>esame2</td>
          <td>classe1, class2</td>
          <td><Button>Modifica</Button></td>
          <td><Button>Sessioni</Button></td>
        </tr>
        <tr>
          <td>esame3</td>
          <td>classe1, class2</td>
          <td><Button>Modifica</Button></td>
          <td><Button>Sessioni</Button></td>
        </tr>
        <tr>
          <td>esame4</td>
          <td>classe1, class2</td>
          <td><Button>Modifica</Button></td>
          <td><Button>Sessioni</Button></td>
        </tr>
        <tr>
          <td>esame5</td>
          <td>classe1, class2</td>
          <td><Button>Modifica</Button></td>
          <td><Button>Sessioni</Button></td>
        </tr>
      </tbody>
    </Table>
    </>
  );
};