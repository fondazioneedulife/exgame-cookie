import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Role, User } from "../../../../api-types/user";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";

export const CurrentUserContext = createContext<User | undefined>(undefined);

/**
 * Controllare che l'utente sia autenticato e che sia un teacher
 * Chiama l'api GET /users/me, che restituisce l'utente loggato, oppure un 401
 */
export const TeacherGuard: React.FC<PropsWithChildren> = ({ children }) => {
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
  }, []);

  if (authenticated === "loading") {
    return "LOADING";
  }

  if (authenticated) {
    if (role === "teacher" || role === "admin") {
      return (
        <CurrentUserContext.Provider value={currentUser}>
          {children}
        </CurrentUserContext.Provider>
      );
    }
  }

  console.log(
    "You are not authenticated or you don't have teacher rights. Redirecting to login",
  );
  return <Navigate to="/login" />;
};
