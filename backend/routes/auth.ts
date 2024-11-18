import Router from "@koa/router";
import { User } from "../../api-types";
import { login, registerStudent } from "../services/auth";
import { findByEmailAndPassword } from "../services/auth";

const authRoutes = new Router({
  prefix: "/auth",
});

// Register student
authRoutes.post("/sign-up/student", async (ctx) => {
  ctx.accepts("json");
  const newUser = ctx.request.body as User; // Type Assertion qui
  const result = await registerStudent(newUser);
  ctx.body = result;
});

export { authRoutes };

authRoutes.post("/login", async (ctx) => {
  // Accetta solo JSON
  ctx.accepts("json");
  
  // 1- Prendo email e password dal ctx.body (inviati dall'API)
  const { email, password } = ctx.request.body as any;
  
  // 2- Controllo se email e password sono stati forniti
  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  // 3 - Verifico che l'utente esista e che la password sia corretta
  const user = await findByEmailAndPassword(email, password);
  
  if (!user) {
    // Se l'utente non esiste, ritorna un 401
    ctx.status = 401;
    ctx.body = { error: "Invalid email or password" };
    return;
  }
  // 4 - Se l'utente esiste, setto la sessione come autenticata
  ctx.session.authenticated = true;
  ctx.body = { user };
  ctx.status = 200;
});


export const authMiddleware = () => async (ctx, next) => {
  const isAuthenticated = ctx.session.authenticated === true;
  if (isAuthenticated) {
    return await next();
  }
  ctx.status = 401;
};

export default Router;