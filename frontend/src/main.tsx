import { CssBaseline } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// const materialTheme = materialExtendTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <MaterialThemeProvider theme={materialTheme}> */}
    <CssBaseline />
    <App />
    {/* </MaterialThemeProvider> */}
  </StrictMode>,
);
