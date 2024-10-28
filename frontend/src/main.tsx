import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>,
);
