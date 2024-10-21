import Router from "@koa/router";
import { User } from "../../api-types";
import { add, index } from "../services/user";

const router = new Router({
  prefix: "/users",
});

// All routes
router.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

// router.get("/role/:role", (ctx) => {
//   ctx.body = getUsersByRole(ctx.params.role as Role);
// });

// // Find a teacher
// router.get("/:id", (ctx) => {
//   ctx.body = view(ctx.params.id);
// });

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// // Find a teacher
// router.put("/:id", (ctx) => {
//   ctx.accepts("json");
//   edit(ctx.request.body as User);
//   ctx.response.body = ctx.request.body;
// });

// // Delete a teacher
// router.delete("/:id", (ctx) => {
//   ctx.body = remove(ctx.params.id);
// });

export default router;
