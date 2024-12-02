import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
/**
 * Controllare che l'utente sia autenticato e che sia un teacher
 * chiama api GET /users/me, che restituisce l'utente loggato, oppure un 401
 */
export const TeacherGuard: React.FC = () => {
  console.log("you must be a teacher");


  const [authenticated, setAuthenticated] = useState<boolean | "loading">("loading");

  useEffect(() => {
    fetch('/users/me')
    .then((res)=>res.json())
    .then((user)=>{
      setAuthenticated(Boolean(user));
    })
  }, []);//la funzione viene svolta ogni volta che una delle dipendenze dentro all'array, cambia

  if(authenticated==="loading"){
    return null;
  }

  if(authenticated){
    return <Outlet />;
  }
  return <Navigate to="/login" />
  //vai al login
};
