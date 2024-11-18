import Router from "@koa/router";
import { User } from "../../api-types";
import { login, registerStudent } from "../services/auth";

const authRoutes = new Router({
  prefix: "/auth",
});

// Register student
authRoutes.post("/register", async (ctx) => {
  ctx.accepts("json");
  const newUser = ctx.request.body as User; // Type Assertion qui

  if (!newUser.email || !newUser.password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  try {
    const result = await registerStudent(newUser);
    ctx.status = 201;
    ctx.body = { message: "User registered successfully", user: result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred during registration" };
  }
});

// Login
authRoutes.post("/login", async (ctx) => {
  ctx.accepts("json");

  const { email, password } = ctx.request.body as { email: string; password: string };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  try {
    const user = await login(email, password);
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Invalid email or password" };
      return;
    }

    // Autentica la sessione
    ctx.session.authenticated = true;
    ctx.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    ctx.status = 200;
    ctx.body = { message: "Login successful", user };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred during login" };
  }
});

//logout
authRoutes.get("/logout", (ctx) => {
  ctx.session = null;
  ctx.response.status = 200;
});

//auth milldleware
export const authMiddleware = () => async (ctx, next) => {
  const isAuthenticated = ctx.session.authenticated === true;
  if (isAuthenticated) {
    return await next();
  }
  ctx.status = 401;
};

export { authRoutes };