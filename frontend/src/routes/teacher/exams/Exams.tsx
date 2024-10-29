import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import { Stack, Chip } from '@mui/joy';
import Typography from '@mui/joy/Typography';


export const Exams: React.FC = () => {
  return (
    <>
    <Stack direction="row" spacing={1}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography level="h2">Esami</Typography>
      <Button variant="solid" onClick={function(){}}>Crea esame</Button>

    </Stack> 

      <Table aria-label="basic table">
        <thead>
          <tr>
            <th><Typography level="h4">Titolo</Typography></th>
            <th><Typography level="h4" sx={{ textAlign: 'center' }}>Classi</Typography></th>
            <th><Typography level="h4" sx={{ textAlign: 'center' }}>Azioni</Typography></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Typography level="title-md">Titolo</Typography></td>
            <td>
              <Stack direction="row" spacing={1}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Chip>Cookie</Chip> <Chip>Suse</Chip>
              </Stack>
            </td>
            <td>
              <Stack direction="row" spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="neutral"
                  onClick={function(){}}
                  size="md"
                  variant="outlined"
                > Modifica </Button>

                <Button
                  color="neutral"
                  onClick={function(){}}
                  size="md"
                  variant="outlined"
                > Sessioni </Button>

              </Stack>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
