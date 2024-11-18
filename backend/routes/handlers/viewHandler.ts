import { getmockLoggedUser } from "../../mock/mockLoggedUser";
import {
  viewForAdmin,
  viewForStudent,
  viewForTeacher,
  viewYourself
} from "../../services/user";

export const viewHandler = async (ctx) => {
  const loggedUser = await getmockLoggedUser();
  let user;
  switch (loggedUser.role) {
    case "admin":
      user = await viewForAdmin(ctx.params.id);
      break;
    case "teacher":
      
      if(ctx.params.id == loggedUser._id){
        user = await viewYourself(ctx.params.id);
      } else {
        const classes = loggedUser.teacher_classes;
        if (classes && classes.length !== 0) {
          user = await viewForTeacher(ctx.params.id, classes);
        } else {
          ctx.status = 400;
          ctx.response.body = { message: "Utente non presente nella lista delle tue classi" };
        }
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
