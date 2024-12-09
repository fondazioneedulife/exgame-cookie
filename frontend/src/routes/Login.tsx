import { Box, Button, Checkbox, Input, Typography } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { config } from "../config";

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Inserisci sia l'email che la password.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${config.API_BASEPATH}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Errore: ${response.status}`);
      }

      const data = await response.json();
      console.log("Risposta API:", data);
      navigate("/");
    } catch (error) {
      setError("Credenziali errate o problema con il server.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography level="h2" component="h1" sx={{ mb: 2 }}>
        Login
      </Typography>

      {/* Input per inserire l'email */}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Inserisci la tua email"
          color="neutral"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>

      {/* Input per inserire la password */}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Inserisci la tua password"
          color="neutral"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Checkbox
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          label="Mostra password"
          sx={{ mb: 2 }}
        />
      </FormControl>

      {/* Messaggio di errore */}
      {error && (
        <Typography color="danger" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="solid" color="primary" fullWidth>
        Login
      </Button>
      <Box
        sx={{
          mt: 2,
          fontSize: "sm",
        }}
      >
        Non ti sei ancora registrato?{" "}
        <Link to="/register">Registrati subito</Link>
      </Box>
    </form>
  );
};
