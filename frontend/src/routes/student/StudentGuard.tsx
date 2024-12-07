import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Role, User } from "../../../../api-types/user";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";

export const StudentGuard: React.FC = () => {
  console.log("you must be a student");

  const [authenticated, setAuthenticated] = useState<boolean | "loading">(
    "loading",
  );
  const [role, setRole] = useState<Role | undefined>();
  const [currentUser, setCurrentUser] = useState<User>();
  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/users/me`)
      .then((res) => res?.json())
      .then((user: User) => {
        console.log("Authenticated as", user);
        setAuthenticated(Boolean(user));
        setCurrentUser(user);
        setRole(user.role);
      });
  }, [fetch]);

  if (authenticated === "loading") {
    return null;
  }

  if (authenticated) {
    if (role === "student") {
      return (
        <CurrentUserContext.Provider value={currentUser}>
          <Outlet />;
        </CurrentUserContext.Provider>
      );
    }
  }

  return <Navigate to="/login" />;
};
