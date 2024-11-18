import {User } from "../../../api-types";
import { isAdmin, getmockLoggedUser } from "../../mock/mockLoggedUser";
import {  edit, editYorself } from "../../services/user";


export const editHandler = async (ctx) => {
   
    const loggedUser = await getmockLoggedUser();
    let userEdit;

    switch(loggedUser.role){
        case "admin":
            // qui l'admin può modificare tutti gli attributi di tutti e modificare il ruolo assegnado nuovi techer
            userEdit =  await edit(ctx.params.id, ctx.request.body as User)
            break;
        case "teacher":
            if(ctx.params.id == loggedUser._id){
                userEdit =  await editYorself(loggedUser._id, ctx.request.body as User);
            }else{
                ctx.status = 400;
                ctx.response.body = "non puoi modificare un'altro utente";
            }
            break;
        case "student":
            if(ctx.params.id == loggedUser._id){
                userEdit =  await editYorself(loggedUser._id, ctx.request.body as User);
            }else{
                ctx.status = 400;
                ctx.response.body = "non puoi modificare un'altro utente";
            }
            break;

        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }

    return userEdit;

  };



