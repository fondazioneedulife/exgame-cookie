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
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/users",
});

router.use(authMiddleware());

// All users
router.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/me", async (ctx) => {
  ctx.response.body = ctx.session.user;
});

router.get("/role/:role", async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", async (ctx) => {
  const user = await view(ctx.params.id, ctx.session.user);

  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// Edit a user
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
router.delete("/:id", async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default router;
