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
  const [idutente, setIdutente] = useState("");
  const [first_name, setName] = useState("Mario");
  const [last_name, setlastName] = useState("Rossi");
  const [email, setEmail] = useState("esempio@esempio.com");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const fetch = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.API_BASEPATH}/users/me`);
      if (response.ok) {
        const result = await response.json();
        setName(result.first_name);
        setlastName(result.last_name);
        setEmail(result.email);
        setIdutente(result._id);
      } else {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${config.API_BASEPATH}/users/${idutente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email }),
      });
      if (response.ok) {
        const result = await response.json();
        setIsSaving(false);
        navigate("/student/:id/profile/details");
      } else {
        setError(true);
        setIsSaving(false);
      }
    } catch (error) {
      setError(true);
      setIsSaving(false);
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
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salva"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
