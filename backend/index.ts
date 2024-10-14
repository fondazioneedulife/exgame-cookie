import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import serveStatic from "koa-static";
import { initSocketIo } from "./io";
import { bodyParser } from "@koa/bodyParser";
import teacherRouters from "./routes/teachers";
const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());
initSocketIo(httpServer);

app.use(cors()); // TODO: configure for production
app.use(bodyParser());
app.use(serveStatic(`./public`, {}));

app.use((ctx, next) => {
  console.log("Incoming HTTP request");
  // ctx.status = 200;
  // ctx.body = "Hello Koa";
  next();
});

router.get("/", (ctx) => {
  ctx.body = "Ciao, qui ci sono tutti gli esami";
});

app.use(router.routes()).use(router.allowedMethods());
app.use(teacherRouters.routes()).use(teacherRouters.allowedMethods());
httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});
