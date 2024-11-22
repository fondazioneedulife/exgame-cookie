import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import session from "koa-session";
import serveStatic from "koa-static";
import { initSocketIo } from "./io";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import examRoutes from "./routes/exams";

const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());
initSocketIo(httpServer);

app.use(cors()); // TODO: configure for production
app.use(bodyParser());
app.use(serveStatic(`./public`, {}));

app.keys = ["secret-ln9mLhYTd/kK(o.-inir"];
app.use(session({ key: "session" }, app));

router.get("/", (ctx) => {
  ctx.body = "ExGame - school is fun";
});

app.use(router.routes()).use(router.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(examRoutes.routes()).use(examRoutes.allowedMethods());

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});

// TODO: check
// const serverOnclose = () => {
//   httpServer.close();
//   DB.connection.close();
//   console.info("Server closed");
// };

// process.on("SIGTERM", serverOnclose);

// process.on("SIGKILL", serverOnclose);

// process.on("SIGINT", serverOnclose);
