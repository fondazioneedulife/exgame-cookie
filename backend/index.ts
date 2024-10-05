import cors from "@koa/cors";
import Router from "@koa/router";
import Koa from "koa";

const app = new Koa();
const router = new Router();

app.use(cors());

app.use((ctx, next) => {
  console.log("Incoming HTTP request");
  // ctx.status = 200;
  // ctx.body = "Hello Koa";
  next();
});

router.get("/", (ctx) => {
  ctx.body = "Ciao";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
