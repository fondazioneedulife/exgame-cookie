import Router from "@koa/router";
import { Session } from "../../api-types";
import { addSession, getSessions } from "../services/session";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/sessions",
});

router.use(authMiddleware());

router.get("/:examId", async (ctx) => {
  ctx.body = await getSessions(ctx.params.examId, ctx);
});

router.post("/", async (ctx) => {
  ctx.accepts("json");
  const session = await addSession(ctx.request.body as Session);
  ctx.response.body = session;
});

export default router;
