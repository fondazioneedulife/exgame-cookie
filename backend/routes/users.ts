import Router from "@koa/router";
import { User , Role } from "../../api-types";
import { add, edit, getUsersByRole, index, remove, view } from "../services/user";

const router = new Router({
    prefix: "/users",
});

// All routes
router.get("/", (ctx) => {
    ctx.body = index();
});

//Find all users with a determinated role
router.get("/role/:role" , (ctx) =>{
    ctx.body = getUsersByRole(ctx.params.id as Role);
});

// Find a user
router.get("/:id" , (ctx) =>{
    ctx.body = view(ctx.params.id);
});

// Add a user
router.post("/" , (ctx) =>{
    ctx.accepts("json");
    add(ctx.request.body as User);
    ctx.response.body = ctx.request.body;
});

// Find a user
router.put("/:id" , (ctx) =>{
    ctx.accepts("json");
    edit(ctx.request.body as User);
    ctx.response.body = ctx.request.body;
});

// Delete a user
router.delete("/:id" , (ctx) =>{
    ctx.body = remove(ctx.params.id);
});

export default router;