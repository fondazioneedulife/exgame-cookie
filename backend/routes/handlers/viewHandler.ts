import { getmockLoggedUser } from "../../mock/mockLoggedUser";
import {
  viewForAdmin,
  viewForStudent,
  viewForTeacher,
} from "../../services/user";

export const viewHandler = async (ctx) => {
  const loggedUser = await getmockLoggedUser();
  let user;
  switch (loggedUser.role) {
    case "admin":
      user = await viewForAdmin(ctx.params.id);
      break;
    case "teacher":
      const classes = loggedUser.teacher_classes;
      if (classes && classes.length !== 0) {
        user = await viewForTeacher(ctx.params.id, classes);
      } else {
        ctx.status = 400;
        ctx.response.body = { message: "Non hai nessuna classe assegnata" };
      }
      break;
    case "student":
      user = await viewForStudent(ctx.params.id, loggedUser.student_class);
      if (!user && user.length === 0) {
        user = "nessun tuo compagno di classe ha questo id";
      }
      break;
  }
  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }
  return user;
};
