import { Avatar, List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "16px",
      }}
    >
      <img src="/logo.svg" height={50} />
      <Stack direction="row" spacing={2}>
        <List role="menubar" orientation="horizontal">
          <ListItem role="none">
            <ListItemButton role="menuitem" component="a">
              <Link
                to="/classes"
                style={{ color: "black", textDecoration: "none" }}
              >
                Gestisci gli studenti
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
        <Link to="/student/:id/profile/details">
          <Avatar />
        </Link>
      </Stack>
    </Stack>
  );
};
