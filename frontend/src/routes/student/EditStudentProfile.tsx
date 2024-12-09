import * as React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
export const EditStudentProfile: React.FC = () => {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={""} sx={{ width: 224, height: 224 }} />
            <Box sx={{ ml: 6 }}>
            <Stack sx={{ minWidth: 300 }} >
            <Input
            color="neutral"
            defaultValue="Nome Cognome Modificato"
            size="lg"
            variant="outlined"
            />
            </Stack >
            <br/>
            <Input
            color="neutral"
            defaultValue="Email"
            size="sm"
            variant="outlined"
            />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ml: 2 }}>
              <Typography component="h5" style={{ marginBottom: '1rem' , marginTop: '1rem'}}>Ruolo</Typography>
              <Typography component="h5" style={{ marginBottom: '1rem'}}>Classe</Typography>
              <Typography component="h5">Materie *</Typography>
            </Box>
          </Box>

          <Stack sx={{ justifyContent: "center", alignItems: "flex-end", }}>
            <Button><Link to="/student/7/profile/details/edit">Modifica</Link></Button>
          </Stack>

        </CardContent>
      </Card>
    );
};