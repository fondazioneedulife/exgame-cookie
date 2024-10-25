import { Container } from "@mui/joy";
import "./App.css";
import { Header } from "./components/Header";
import { Navigation } from "./Navigation";

function App() {
  return (
    <Container maxWidth={false}>
      <Header />
      <Navigation />
    </Container>
  );
}

export default App;
