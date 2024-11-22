import Router from "@koa/router";
import { User } from "../../api-types";
import { login, registerStudent } from "../services/auth";
import { AuthenticatedContext } from "../types/session";

const router = new Router({
  prefix: "/auth",
});

/**
 *  Register: by default, new users are saved as "student"
 */
router.post("/register", async (ctx) => {
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
    console.error(error);
  }
});

/**
 * Login
 */
router.post<unknown, AuthenticatedContext>("/login", async (ctx) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password: _, ...sessionUser} = user;
    ctx.session.user = sessionUser;

    ctx.status = 200;
    ctx.body = { message: "Login successful", user };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred during login" };
    console.error(error);
  }
});

/**
 * Logout
 */
router.get("/logout", (ctx) => {
  ctx.session = null;
  ctx.response.status = 200;
});

export default router;

/**
 * Auth middleware
 */
export const authMiddleware = (): Router.Middleware<unknown, AuthenticatedContext> => async (ctx, next) => {
  const isAuthenticated = ctx.session.authenticated === true;
  if (isAuthenticated) {
    return await next();
  }
  ctx.status = 401;
};