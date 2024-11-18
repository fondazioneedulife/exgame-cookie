import Router from "@koa/router";
import { Session } from "../../api-types";
import { addSession, getSessions } from "../services/session";

const router = new Router({
  prefix: "/sessions",
});

router.get("/:examId", async (ctx) => {
  ctx.body = await getSessions(ctx.params.examId);
});


router.post("/", async (ctx) => {
    ctx.accepts("json");
    const session = await addSession(ctx.request.body as Session);
    ctx.response.body = session;
})

export default router;
