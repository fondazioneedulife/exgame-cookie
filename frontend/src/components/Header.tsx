import { Avatar, List, ListItem, ListItemButton, Stack } from "@mui/joy";

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
              Gestisci gli studenti
            </ListItemButton>
          </ListItem>
        </List>
        <Avatar />
      </Stack>
    </Stack>
  );
};
