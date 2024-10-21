import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { add, edit, index, remove, view } from "../services/user";
import { getUsersByRole } from "../services/user";

const router = new Router({
    prefix: "/users",
});

// All routes
router.get("/", (ctx) => {
    const all = await index();
    ctx.response.body = all;
});

// router.get("/role/:role", (ctx) => {
//     ctx.body = getUsersByRole(ctx.params.role as Role);
// });

// Find a user
router.get("/:id", (ctx) => {
    ctx.body = view(ctx.params.id);
});

// // Add a user
// router.post("/", (ctx) => {
//     ctx.accepts("json");
//     add(ctx.request.body as User);
//     ctx.response.body = ctx.request.body;
// });

// // Find a user
// router.put("/:id", (ctx) => {
//     ctx.accepts("json");
//     edit(ctx.request.body as User);
//     ctx.response.body = ctx.request.body;
// });

// // Delete a user
// router.delete("/:id", (ctx) => {
//     ctx.body = remove(ctx.params.id);
// });

export default router;