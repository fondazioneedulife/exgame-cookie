import { Outlet } from "react-router-dom";

export const TeacherGuard: React.FC = () => {
  console.log("you must be a teacher");
  return <Outlet />;
};
