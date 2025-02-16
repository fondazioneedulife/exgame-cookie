import { Avatar, List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { Link } from "react-router-dom";
import { User } from "../../../api-types";
import { useEffect, useState } from "react";
import { useFetch } from "../lib/useFetch";
import { config } from "../config";

export const Header: React.FC = () => {

  // user data
  const [currentUser, setCurrentUser] = useState<User>();
  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/users/me`)
      .then((res) => res?.json())
      .then((user: User) => {
        setCurrentUser(user);
      });
  }, [fetch]);
  
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
            <ListItemButton role="menuitem">
              <Link
                to="/teacher/classes"
                style={{ color: "black", textDecoration: "none" }}
              >
                Gestisci le classi
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem role="none">
            {/* <Link to={`/student/${currentUser?._id}/profile/details`}>
              <Avatar />
            </Link> */}
            <Link to={`/user/${currentUser?._id}/profile/details`}>
              <Avatar />
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};
