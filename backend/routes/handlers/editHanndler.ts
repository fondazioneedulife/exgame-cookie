import Router from "@koa/router";
import { Role, User } from "../../../api-types";
import { isAdmin, getmockLoggedUser } from "../../mock/mockLoggedUser";
import {  editForAdmin, editForStudent, editForTeacher } from "../../services/user";


export const editHandler = async (ctx) => {
   
    const loggedUser = await getmockLoggedUser();
    console.log(loggedUser.role);
    let edit;

    switch(loggedUser.role){
        case "admin":
            edit =  await editForAdmin(ctx.params.id, ctx.request.body as User)
            break;
        case "teacher":
            const classes = loggedUser.classes;
            if (classes && classes.length !== 0) {
                ctx.body = await editForTeacher(ctx.params.id, ctx.request.body as User);
            } else {
                ctx.status = 400;
                ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            }
            break;
        case "student":
            edit = await editForStudent(ctx.params.id, ctx.request.body as User)
            break;

        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }

    return edit;

  };



