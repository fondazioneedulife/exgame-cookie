import * as React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import { useFetch } from "../../lib/useFetch";
import { useEffect, useState } from "react";

export const EditStudentProfile: React.FC = () => {
  const [first_name, setName] = useState("Mario");
  const [last_name, setlastName] = useState("Rossi");
  const [email, setEmail] = useState("esempio@esempio.com");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const fetch = useFetch();

  const fetchWithAuth = useFetch();

  React.useEffect(() => {
    const testFetch = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:3000/users");
        console.log("Test fetch response:", response);
      } catch (error) {
        console.error("Test fetch error:", error);
      }
    };

    testFetch();
  }, [fetchWithAuth]);

  useEffect(() => {
    const saveData = async () => {
      if (isSaving) {
        const payload = { first_name, last_name, email };

        try {
          const response = await fetch(
            "http://localhost:3000/users/507f1f77bcf86cd799439011", // Modifica con l'ID giusto
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            },
          );

          if (response.ok) {
            console.log("Dati salvati con successo");
            navigate("/student/7/profile/details");
          } else {
            console.error(
              "Errore durante il salvataggio:",
              response.statusText,
            );
          }
        } catch (error) {
          console.error("Errore nella richiesta API:", error);
        } finally {
          setIsSaving(false); // Assicurati che lo stato venga resettato
        }
      }
    };

    saveData();
  }, [isSaving, first_name, email, navigate, fetch]);

  const handleSave = () => {
    setIsSaving(true);
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
                value={first_name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
              <label>Cognome</label>
              <Input
                color="neutral"
                size="sm"
                value={last_name}
                onChange={(e) => setlastName(e.target.value)}
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
