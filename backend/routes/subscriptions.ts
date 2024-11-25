import Router from "@koa/router";
import { Subscription } from "../../api-types";
import {
  getSubscriptionBySessionForStudent,
  getSubscriptionsBySessionForTeacher,
  postSubscription,
} from "../services/subscription";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/subscriptions",
});

router.use(authMiddleware());

//Get subscriptions by sessions for teacher and student
router.get("/:sessionId", async (ctx) => {
  const loggedUser = ctx.session.user;

  switch (loggedUser.role) {
    case "teacher":
      ctx.body = await getSubscriptionsBySessionForTeacher(
        ctx.params.sessionId,
      );
      break;
    case "student":
      ctx.body = await getSubscriptionBySessionForStudent(ctx.params.sessionId, ctx);
      break;
  }
});

//Add subscription
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const subscription = await postSubscription(ctx.request.body as Subscription);
  ctx.response.body = subscription;
  console.log(subscription);
});

export default router;
