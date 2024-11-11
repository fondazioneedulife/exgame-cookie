import Router from "@koa/router";
import { User } from "../../api-types";
import { login, registerStudent } from "../services/auth";
=======

const authRoutes = new Router({
  prefix: "/auth",
});

// Login user
authRoutes.get("/sign-in", async (ctx) => {
  const { email, password } = ctx.request.query;
  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Missing email or password" };
    return;
  }
  const user = await login(email as string, password as string);
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
    return;
  }
  ctx.body = user;
});

// Register student
authRoutes.post("/sign-up/student", async (ctx) => {
  ctx.accepts("json");
  const newUser = ctx.request.body as User; // Type Assertion qui
  const result = await registerStudent(newUser);
  ctx.body = result;
});

export { authRoutes };
