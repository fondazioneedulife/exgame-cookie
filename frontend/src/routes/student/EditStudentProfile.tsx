import * as React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import { useFetch } from "../../lib/useFetch";
import { useEffect, useState } from "react";
import { config } from "../../config";

export const EditStudentProfile: React.FC = () => {
  const [first_name, setName] = useState("Mario");
  const [last_name, setlastName] = useState("Rossi");
  const [email, setEmail] = useState("esempio@esempio.com");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const fetch = useFetch();

  // Recupera i dati iniziali dalla chiamata `/me`
  useEffect(() => {
    fetch(`${config.API_BASEPATH}/users/me`)
      .then((res) => {
        if (!res || !res.ok) {
          console.error(
            "Errore durante il recupero del profilo:",
            res?.statusText || "Errore sconosciuto",
          );
          return null;
        }
        return res.json();
      })
      .then((user) => {
        if (user) {
          setName(user.first_name || "");
          setlastName(user.last_name || "");
          setEmail(user.email || "");
        }
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  }, [fetch]);

  // Salvataggio dei dati
  useEffect(() => {
    if (isSaving) {
      const payload = { first_name, last_name, email };

      fetch(`${config.API_BASEPATH}/users/674d7fbb76f97f5f0f108007`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response) {
            console.error("Redirect effettuato o risposta vuota");
            return;
          }

          if (!response.ok) {
            console.error(
              "Errore durante il salvataggio:",
              response.statusText,
            );
            return;
          }

          return response.json();
        })
        .then(() => {
          console.log("Dati salvati con successo");
          navigate("/student/7/profile/details");
        })
        .catch((error) => {
          console.error("Errore nella richiesta API:", error);
        })
        .finally(() => {
          setIsSaving(false); // Assicurati che lo stato venga resettato
        });
    }
  }, [fetch, isSaving, first_name, last_name, email, navigate]);

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
