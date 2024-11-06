import Router from "@koa/router";
import { User, Role } from "../../api-types";
import { getmockLoggedUser, isAdmin, isTeacher, isAdminOrTeacher } from "../mock/mockLoggedUser";
import {  getAllClasses, getStudentsOfClass } from "../services/user";
// import {   } from "../services/user";

const router = new Router({
    prefix: "/classes",
});

const isAdminOrTeacherMiddleware = async (ctx, next) => {
    if (isAdminOrTeacher()) {
        await next();
    } else {
        ctx.status = 401;
        ctx.response.body = "user non autorizzato";
    }
};

//get all classes / if teacher get your classes
router.get("/", isAdminOrTeacherMiddleware, async(ctx) =>{
    if(isAdmin()){
        ctx.body = await getAllClasses();
    }else{
        ctx.body = getmockLoggedUser().classes;
    }
});

//view all student of a class
router.get("/:class", isAdminOrTeacherMiddleware, async(ctx) =>{
    ctx.body = await getStudentsOfClass(ctx.params.class);
});

export default router;