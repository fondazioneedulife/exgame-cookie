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
      <Link to="/">
        <img src="/Logo_Exgame_1.svg" alt="exGame" height={70} />
      </Link>
      <Stack direction="row" spacing={2}>
        <List role="menubar" orientation="horizontal">
          <ListItem role="none">
            <ListItemButton role="<menuitem>">
              <Link
                to="/teacher/classes"
                style={{ color: "black", textDecoration: "none" }}
              >
                Gestisci gli studenti
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem role="none">
            <Link to="/student/:id/profile/details">
              <Avatar />
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};
