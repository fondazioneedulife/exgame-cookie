import * as React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';


export const UserProfile: React.FC = () => {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={""} sx={{ width: 224, height: 224 }} />
            <Box sx={{ ml: 6 }}>
              <Typography component="h5" style={{ fontSize: '2rem' }}>Nome Cognome</Typography>
              <Typography component="h5">email</Typography>
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
            <Button>Modifica</Button>
          </Stack>

        </CardContent>
      </Card>
    );
};

  
export default UserProfile;
  