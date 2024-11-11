import {User } from "../../../api-types";
import { isAdmin, getmockLoggedUser } from "../../mock/mockLoggedUser";
import {  edit, editYorself } from "../../services/user";


export const editHandler = async (ctx) => {
   
    const loggedUser = await getmockLoggedUser();
    let userEdit;

    switch(loggedUser.role){
        case "admin":
            userEdit =  await edit(ctx.params.id, ctx.request.body as User)
            break;
        case "teacher":
            userEdit =  await editYorself(loggedUser._id, ctx.request.body as User);
            break;
        case "student":
            userEdit = await editYorself(loggedUser._id, ctx.request.body as User)
            break;

        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }

    return userEdit;

  };



