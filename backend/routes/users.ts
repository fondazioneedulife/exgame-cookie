import Router from "@koa/router";
import { Role, User } from "../../api-types";
import {
  add,
  edit,
  getUsersByRole,
  index,
  remove,
  view,
  findByEmailAndPassword,
} from "../services/user";
import mongoose from "mongoose"; // Importa mongoose per validare ObjectId

const userRoutes = new Router({
  prefix: "/users",
});

// All routes
userRoutes.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

// Get users by role
userRoutes.get("/role/:role", async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
userRoutes.get("/:id", async (ctx) => {
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid ID format" };
    return;
  }

  const user = await view(id);

  if (!user) {
    // User not found
    ctx.status = 404;
    ctx.body = { error: "User not found" };
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
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid ID format" };
    return;
  }

  const response = await edit(id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
userRoutes.delete("/:id", async (ctx) => {
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid ID format" };
    return;
  }

  ctx.body = await remove(id);
});

<<<<<<< Updated upstream
// Login a user
userRoutes.post("/login", async (ctx) => {
  ctx.accepts("json");
  const { email, password } = ctx.request.body as any;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  const user = await findByEmailAndPassword(email, password);

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: "Invalid email or password" };
    return;
  }

  ctx.body = user;
});

export { userRoutes };
=======
<<<<<<< Updated upstream
export default router;
=======


export { userRoutes };
>>>>>>> Stashed changes
>>>>>>> Stashed changes
