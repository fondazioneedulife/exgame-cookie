import Router from "@koa/router";
import { User , Role } from "../../api-types";
import { getmockLoggedUser } from "../mock/mockLoggedUser";
import {  edit, add, getUsersByRole, index, getUsersWithoutClass, getMyStudents, remove, view } from "../services/user";

const router = new Router({
    prefix: "/users",
});

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
    const loggedUser = getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.body = await getUsersWithoutClass();
            break;
        case "teacher":
            ctx.body = await getUsersWithoutClass();
            break;
        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }
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
router.get("/my-students", async(ctx) =>{
    
    const loggedUser = getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.status = 400;
            ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            break;

        case "teacher":
            const classes = loggedUser.classes;
            if (classes && classes.length !== 0) {
                ctx.body = await getMyStudents(classes);
            } else {
                ctx.status = 400;
                ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            }
            break;

        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;

        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
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