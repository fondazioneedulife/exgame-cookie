import Router from "@koa/router";
import { User , Role } from "../../api-types";
import {  edit, add, getUsersByRole, index, getUsersWithoutClass, remove, view } from "../services/user";
// import {   } from "../services/user";

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
    ctx.body = await getUsersWithoutClass();
});

// Find a single user
router.get("/:id" , async(ctx) =>{
    ctx.body = await view(ctx.params.id);
});

// Add a user
router.post("/" , async(ctx)=> {
    ctx.accepts("json");
    const body = await add(ctx.body as User);
    ctx.response.body = body;
})

// Modify a user
router.put("/:id" , async(ctx) =>{
    ctx.accepts("json");
    const response = await edit(ctx.params.id, ctx.body as User);
    ctx.response.body = response;
});

// Delete a user
router.delete("/:id", async (ctx) => {
    ctx.body = await remove(ctx.params.id);
});

export default router;