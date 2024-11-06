import Router from "@koa/router";
import { User , Role } from "../../api-types";
import { getmockLoggedUser, isAdmin, isTeacher, isAdminOrTeacher } from "../mock/mockLoggedUser";
import {  edit, add, getUsersByRole, index, getUsersWithoutClass, getMyStudets, remove, view } from "../services/user";
// import {   } from "../services/user";

const router = new Router({
    prefix: "/users",
});

const isAdminOrTeacherMiddleware = async (ctx, next) => {
    if (isAdminOrTeacher()) {
        await next();
    } else {
        ctx.status = 401;
        ctx.response.body = "user non autorizzato";
    }
};

// All routes
router.get("/", async(ctx) => {
    const all = await index();
    ctx.body = all;
});

// Find all users with a determinated role
router.get("/role/:role" , async(ctx) =>{
    ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find all studens without a class
router.get("/students-without-class" , async(ctx) =>{
    ctx.body = await getUsersWithoutClass();
});

// Find a single user
router.get("/:id" , async(ctx) =>{
    ctx.body = await view(ctx.params.id);
});

// Add a user
router.post("/", async(ctx) => {
    try {
        ctx.accepts("json");
        const body = await add(ctx.request.body as User);
        ctx.response.body = body;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            message: "Si è verificato un errore",
            error: error.message
        };
    }
});

//find all the students in the classes taught by a teacher.
router.get("/my-students", isAdminOrTeacherMiddleware, async(ctx) =>{
    const classes = getmockLoggedUser().classes;
    if (classes && classes.length !== 0) {
        ctx.body = await getMyStudets(classes);
    } else {
        ctx.status = 400;
        ctx.response.body = { message: "Non hai assegnato nessuna classe." };
    }
});

// Modify a user
router.put("/:id" , async(ctx) =>{
    ctx.accepts("json");
    const response = await edit(ctx.params.id, ctx.request.body as User);
    ctx.response.body = response;
});

// Delete a user
router.delete("/:id", async (ctx) => {
    ctx.body = await remove(ctx.params.id);
});

export default router;