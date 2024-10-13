import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import serveStatic from "koa-static";
import { initSocketIo } from "./io";
import teacherRoutes from "./routes/teachers";

const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());
initSocketIo(httpServer);

app.use(cors()); // TODO: configure for production
app.use(bodyParser());
app.use(serveStatic(`./public`, {}));

router.get("/", (ctx) => {
  ctx.body = "ExGame - school is fun";
});

app.use(router.routes()).use(router.allowedMethods());

app.use(teacherRoutes.routes()).use(teacherRoutes.allowedMethods());

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});
