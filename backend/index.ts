import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import serveStatic from "koa-static";

const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());

app.use(cors()); // TODO: configure for production
app.use(serveStatic(`./public`, {}));

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

httpServer.listen(3000, () => {
  console.log(`Server running`);
});
