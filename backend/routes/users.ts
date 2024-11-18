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
import { authMiddleware } from "./auth";

const userRoutes = new Router({
  prefix: "/users",
});

userRoutes.use(authMiddleware());

// All routes
userRoutes.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

userRoutes.get("/role/:role", async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
userRoutes.get("/:id", async (ctx) => {
  const user = await view(ctx.params.id);

  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Add a user
userRoutes.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// Edit a user
userRoutes.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
userRoutes.delete("/:id", async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default userRoutes;