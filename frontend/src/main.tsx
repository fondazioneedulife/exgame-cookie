import { CssBaseline, CssVarsProvider } from "@mui/joy";
import {
  THEME_ID as MATERIAL_THEME_ID,
  CssVarsProvider as MaterialCssVarsProvider,
  extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

const materialTheme = materialExtendTheme();

const materialTheme = materialExtendTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <CssVarsProvider>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  </StrictMode>,
);