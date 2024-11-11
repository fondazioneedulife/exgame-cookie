import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import Session from "koa-session";
import { createServer } from "http";
import Koa from "koa";
import serveStatic from "koa-static";
<<<<<<< Updated upstream
import initSocketIo from "./io";
import { userRoutes } from "./routes/users";
=======
<<<<<<< Updated upstream
import { initSocketIo } from "./io";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
=======
import initSocketIo from "./io";
import { userRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const app = new Koa();
const router = new Router();
const httpServer = createServer(app.callback());
initSocketIo(httpServer);

app.use(cors()); // TODO: configure for production
app.use(bodyParser()); // Usa il parser del corpo corretto
app.use(serveStatic(`./public`, {}));

app.use(async (ctx, next) => {
  console.log("Incoming HTTP request");
  await next();
});

router.get("/", (ctx) => {
  ctx.body = "ExGame - school is fun";
});

app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

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
