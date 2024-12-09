import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Role, User } from "../../../../api-types/user";

/**
 * Controllare che l'utente sia autenticato e che sia un teacher
 * Chiama l'api GET /users/me, che restituisce l'utente loggato, oppure un 401
 */
export const TeacherGuard: React.FC = () => {
  console.log("you must be a teacher");

  const [authenticated, setAuthenticated] = useState<boolean | "loading">(
    "loading",
  );
  const [role, setRole] = useState<Role | undefined>();

  useEffect(() => {
    fetch("/users/me")
      .then((res) => res.json())
      .then((user: User) => {
        setAuthenticated(Boolean(user));
        setRole(user.role);
      });
  }, []);

  if (authenticated === "loading") {
    return null;
  }

  if (authenticated) {
    if (role === "teacher" || role === "admin") {
      return <Outlet />;
    }
  }

  return <Navigate to="/login" />;
};
