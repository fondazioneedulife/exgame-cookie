import Router from "@koa/router";
import { Role, User } from "../../../api-types";
import { isAdmin, getmockLoggedUser } from "../../mock/mockLoggedUser";
import {  viewForAdmin, viewForStudent, viewForTeacher } from "../../services/user";


export const viewHandler = async (ctx) => {
   
    const loggedUser = await getmockLoggedUser()
    let user;
    switch(loggedUser.role){
      case "admin":
         user = await viewForAdmin(ctx.params.id);
        break
        case "teacher":
        user = await viewForTeacher(ctx.params.id);
        break
      case "student":
        user = await viewForStudent(ctx.params.id);
        break 
    }
    if (!user) {
      // User not found
      ctx.status = 404;
      return;
    }

    return user;

  };



