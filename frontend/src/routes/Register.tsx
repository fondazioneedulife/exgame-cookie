import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Input,
  Typography,
} from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { config } from "../config";

export const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@$!%*?&]/.test(password)) score += 1;
    return score;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setFormData({ ...formData, password: newPassword });
    setStrength(evaluatePasswordStrength(newPassword));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Tutti i campi sono obbligatori.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${config.API_BASEPATH}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password, // Non includiamo confirmPassword
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore durante la registrazione: ${response.status}`);
      }

      navigate("/login");
    } catch (error) {
      setError("Si è verificato un errore durante la registrazione.");
      console.error(error);
    }
  };

  const getBarColor = (index: number) => {
    if (strength >= index + 1) {
      return ["#FF4C4C", "#FF8C42", "#FBD83D", "#4CAF50"][index];
    }
    return "#E0E0E0";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography level="h2" component="h1" sx={{ mb: 2 }}>
        Registrati
      </Typography>

      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          name="first_name"
          placeholder="Inserisci il tuo nome"
          value={formData.first_name}
          onChange={handleChange}
          color="neutral"
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Cognome</FormLabel>
        <Input
          name="last_name"
          placeholder="Inserisci il tuo cognome"
          value={formData.last_name}
          onChange={handleChange}
          color="neutral"
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Inserisci l'email"
          value={formData.email}
          onChange={handleChange}
          color="neutral"
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Inserisci la tua password"
          value={password}
          onChange={handlePasswordChange}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", gap: "4px", mb: 1 }}>
          {[...Array(4)].map((_, index) => (
            <Box
              key={index}
              sx={{
                height: "10px",
                width: "25%",
                backgroundColor: getBarColor(index),
                borderRadius: "2px",
              }}
            />
          ))}
        </Box>
        <FormHelperText sx={{ mb: 2 }}>
          La password deve essere lunga almeno 8 caratteri e contenere lettere
          maiuscole, minuscole, numeri e simboli speciali.
        </FormHelperText>
        <Checkbox
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          label="Mostra password"
          sx={{ mb: 2 }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Conferma password</FormLabel>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Conferma la password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          sx={{ mb: 1 }}
        />
        <Checkbox
          checked={showConfirmPassword}
          onChange={() => setShowConfirmPassword(!showConfirmPassword)}
          label="Mostra conferma password"
          sx={{ mb: 2 }}
        />
      </FormControl>

      {error && (
        <Typography color="danger" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="solid" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
};
