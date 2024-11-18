import Router from "@koa/router";

const router = new Router();

// TODO: questo metodo diventa "post"
router.get("/login", (ctx) => {
  // 1- prendo user e password dal ctx.body (= mi è sato passato dall'api)
  // 2- verifico sul DB che ci sia un utente corrispondente
  // 3 - se l'utente esiste:
  ctx.session.authenticated = true; // TODO: implement authentication logic
  ctx.response.status = 200;

  // 4- se l'utente non esiste, ritorna un 401
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
