import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { add, edit, index, remove, view, getUsersByRole} from "../services/user";

const router = new Router({
    prefix: "/users",
});

// All routes
router.get("/", async (ctx) => {
    const all = await index()
    ctx.body = all;
});

router.get("/role/:role", async (ctx) =>{
    const role = await getUsersByRole(ctx.params.role as Role);
    ctx.body = role;
})

// Find a user
router.get("/:id" , async (ctx) =>{
    const id = await view(ctx.params.id);
    ctx.body = id;
});

// Add a user
router.post("/" ,  (ctx) =>{
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
router.delete("/:id", async (ctx) => {
   ctx.body = await remove(ctx.params.id);
});


export default router;