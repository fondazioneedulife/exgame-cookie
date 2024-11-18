import { User } from "../../../api-types";
import { getmockLoggedUser } from "../../mock/mockLoggedUser";
import { isAdmin } from "../../services/roleCheck";
import { edit, editYorself } from "../../services/user";

export const editHandler = async (ctx) => {
  const loggedUser = await getmockLoggedUser();
  let userEdit;

  switch (loggedUser.role) {
    case "admin":
      // Here the admin can modify all attributes of all users and assign new roles, including assigning new teachers
      userEdit = await edit(ctx.params.id, ctx.request.body as User);
      break;
    case "teacher":
      if (ctx.params.id == loggedUser._id) {
        userEdit = await editYorself(loggedUser._id, ctx.request.body as User);
      } else {
        ctx.status = 400;
        userEdit = "non puoi modificare un'altro utente";
      }
      break;
    case "student":
      if (ctx.params.id == loggedUser._id) {
        userEdit = await editYorself(loggedUser._id, ctx.request.body as User);
      } else {
        ctx.status = 400;
        userEdit = "non puoi modificare un'altro utente";
      }
      break;

    default:
      ctx.status = 401;
      userEdit = "utente non autorizzato";
      break;
  }

  return userEdit;
};
