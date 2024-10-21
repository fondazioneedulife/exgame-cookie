import Router from "@koa/router";
import { Role, User } from "../../api-types";
import {
  add,
  edit,
  getUsersByRole,
  index,
  remove,
  view,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});

// All routes
router.get("/", async (ctx) => {
  ctx.body = await index();
});

router.get("/role/:role", (ctx) => {
  ctx.body = getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", (ctx) => {
  ctx.body = view(ctx.params.id);
});

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  await add(ctx.request.body as User);
  ctx.response.body = ctx.request.body;
});

// Find a user
router.put("/:id", (ctx) => {
  ctx.accepts("json");
  edit(ctx.request.body as User);
  ctx.response.body = ctx.request.body;
});

// Delete a user
router.delete("/:id", (ctx) => {
  ctx.body = remove(ctx.params.id);
});

export default router;
