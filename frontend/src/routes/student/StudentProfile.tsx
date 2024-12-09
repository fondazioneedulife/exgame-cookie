import * as React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { User } from "../../../../api-types/user";
import { useFetch } from "../../lib/useFetch";

export const StudentProfile: React.FC = () => {
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
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={""} sx={{ width: 224, height: 224 }} />
          <Box sx={{ ml: 6 }}>
            <Typography component="h5" style={{ fontSize: "2rem" }}>
              {currentUser?.first_name} {currentUser?.last_name}
            </Typography>
            <Typography component="h5">{currentUser?.email}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 2 }}>
            <Typography
              component="h5"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              {currentUser?.role}
            </Typography>
            {currentUser?.role === "student" && (
              <Typography component="h5" style={{ marginBottom: "1rem" }}>
                {currentUser?.student_class}
              </Typography>
            )}
            {currentUser?.role === "teacher" &&
              currentUser?.subjects &&
              currentUser?.subjects?.length > 0 && (
                <Typography component="h5">
                  {currentUser?.subjects.join(", ")}
                </Typography>
              )}
          </Box>
        </Box>

        <Stack sx={{ justifyContent: "center", alignItems: "flex-end" }}>
          <Button>
            <Link
              to="/student/7/profile/details/edit"
              style={{ color: "white", textDecoration: "none" }}
            >
              Modifica
            </Link>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
