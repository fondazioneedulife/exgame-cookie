import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import serveStatic from "koa-static";
import { initSocketIo } from "./io";
import { bodyParser } from "@koa/bodyparser";
import teacherRoutes from "./routes/teachers";

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
  // ctx.body = "Hello Teachersszzzzz";
  next();
});

router.get("/", (ctx) => {
  ctx.body = "Ciao sono la pagina root";
});

router.get("/exams", (ctx) => {
  ctx.body = "Ciao sono la pagina con tutti gli esami";
});

app.use(router.routes()).use(router.allowedMethods());

app.use(teacherRoutes.routes()).use(teacherRoutes.allowedMethods());

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});
