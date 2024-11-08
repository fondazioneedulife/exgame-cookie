import Router from "@koa/router";

const router = new Router();

// TODO: assign to method "post"
router.get("/login", (ctx) => {
  ctx.session.authenticated = true; // TODO: implement authentication logic
  ctx.response.status = 200;
});

router.get("/logout", (ctx) => {
  ctx.session = null;
  ctx.response.status = 200;
});

export const authMiddleware = () => async (ctx, next) => {
  const isAuthenticated = ctx.session.authenticated === true;
  if (isAuthenticated) {
    return await next();
  }
  ctx.status = 401;
};

export default router;
