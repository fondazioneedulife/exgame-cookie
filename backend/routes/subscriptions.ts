import Router from "@koa/router";
import { Subscription } from "../../api-types";
import {
  getSubscriptionsBySessionForTeacher,
  getSubscriptionBySessionForStudent,
  postSubscription,
} from "../services/subscription";
import { getmockLoggedUser } from "../mock/mockLoggedUser";

const router = new Router({
  prefix: "/subscriptions",
});

//Get subscriptions by sessions for teacher and student
router.get("/:sessionId", async (ctx) => {
  const loggedUser = await getmockLoggedUser();

  switch (loggedUser.role) {
    case "teacher":
      ctx.body = await getSubscriptionsBySessionForTeacher(
        ctx.params.sessionId,
      );
      break;
    case "student":
      ctx.body = await getSubscriptionBySessionForStudent(ctx.params.sessionId);
      break;
  }
});

//Add subscription
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const subscription = await postSubscription(ctx.request.body as Subscription); 
  ctx.response.body = subscription;
});

export default router;
