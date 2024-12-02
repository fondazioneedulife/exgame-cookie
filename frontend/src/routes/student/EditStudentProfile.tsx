import * as React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";

export const EditStudentProfile: React.FC = () => {
  const [name, setName] = React.useState("Mario Rossi");
  const [email, setEmail] = React.useState("esempio@esempio.com");
  const navigate = useNavigate();

  const handleSave = async () => {
    const payload = {
      name,
      email,
    };

    try {
      const response = await fetch(
        `https://localhost:3000/user/671764dd1b5aa7915d4734d7`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );

      if (response.ok) {
        console.log("Dati salvati con successo");
        navigate("/student/7/profile/details"); // Naviga alla pagina dei dettagli dopo il salvataggio
      } else {
        console.error("Errore durante il salvataggio:", response.statusText);
      }
    } catch (error) {
      console.error("Errore nella richiesta API:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="" sx={{ width: 224, height: 224 }} />
          <Box sx={{ ml: 6 }}>
            <Stack sx={{ minWidth: 300 }}>
              <label>Nome</label>
              <Input
                color="neutral"
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Stack>
            <br />
            <label>E-mail</label>
            <Input
              color="neutral"
              size="sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
          <Box sx={{ ml: 2 }}>
            <Typography component="h5" sx={{ mb: 2, mt: 2 }}>
              Ruolo
            </Typography>
            <Typography component="h5" sx={{ mb: 2 }}>
              Classe
            </Typography>
            <Typography component="h5">Materie *</Typography>
          </Box>
        </Box>

        <Stack sx={{ justifyContent: "center", alignItems: "flex-end", mt: 4 }}>
          <Button onClick={handleSave}>Salva</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
