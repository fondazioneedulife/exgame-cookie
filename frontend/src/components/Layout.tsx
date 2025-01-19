import { Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background:
          "linear-gradient(to bottom,rgb(233, 255, 239),rgb(197, 234, 247))",
        backgroundAttachment: "fixed",
        paddingBottom: 4,
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        sx={{
          marginTop: 4,
          paddingBottom: 4,
          background: "white",
          borderRadius: 20,
          padding: 4,
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};
