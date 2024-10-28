import { Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </Container>
  );
};
