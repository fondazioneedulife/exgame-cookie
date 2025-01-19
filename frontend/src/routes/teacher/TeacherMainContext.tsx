import { Outlet } from "react-router";
import { TeacherContext } from "./TeacherContext";
import { TeacherGuard } from "./TeacherGuard";

export const TeacherMainContext = () => {
  return (
    <TeacherGuard>
      <TeacherContext>
        <Outlet />
      </TeacherContext>
    </TeacherGuard>
  );
};
