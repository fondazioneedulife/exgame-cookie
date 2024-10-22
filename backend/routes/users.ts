import Router from "@koa/router";
import { User , Role } from "../../api-types";
import {  edit, add, getUsersByRole, index, getUsersWithoutClass } from "../services/user";
// import { remove, view } from "../services/user";

const router = new Router({
    prefix: "/users",
});

// All routes
router.get("/", async(ctx) => {
    const all = await index();
    ctx.body = all;
});

//Find all users with a determinated role
router.get("/role/:role" , async(ctx) =>{
    ctx.body = await getUsersByRole(ctx.params.id as Role);
});

//Find all studens without a class
router.get("/students-without-class" , async(ctx) =>{
    ctx.body = await getUsersWithoutClass();
});

// Add a user
router.post("/" , async(ctx)=> {
    ctx.accepts("json");
    const body = await add(ctx.body as User);
    ctx.response.body = body;
})

// // Get a user
// router.get("/:id" , (ctx) =>{
//     ctx.body = view(ctx.params.id);
// });

// Modify a user
router.put("/:id" , async(ctx) =>{
    ctx.accepts("json");
    const response = await edit(ctx.params.id, ctx.body as User);
    ctx.response.body = response;
});

// // Delete a user
// router.delete("/:id" , (ctx) =>{
//     ctx.body = remove(ctx.params.id);
// });

export default router;