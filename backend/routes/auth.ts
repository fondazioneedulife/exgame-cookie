import Router from "@koa/router";
import "../services/auth";

const router = new Router();

// TODO: assign to method "post"
router.get("/login", (ctx) => {
  ctx.login({ id: 1, username: "user", password: "secret" });
  ctx.body = { success: true };
});

router.get("/logout", (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 200;
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

export const authMiddleware = () => async (ctx, next) => {
  const isAuthenticated = await ctx.isAuthenticated();
  if (isAuthenticated) {
    return await next();
  }
  ctx.body = { success: false };
  ctx.throw(401);
};

export default router;
