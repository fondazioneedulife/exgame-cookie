import { Outlet } from "react-router-dom";

export const StudentGuard: Reatc.FC = () => {
  console.log("you must be a student");
  return <Outlet />;
};
