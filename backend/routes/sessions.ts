import Router from "@koa/router";
import { Session } from "../../api-types";
import { getMockLoggedUser } from "../mock/mockLoggedUser";
import { get } from "http";

const router = new Router({
  prefix: "/sessions",
});

router.get("/:examId", async (ctx) => {
  const loggedUser = await getMockLoggedUser();

  switch (loggedUser.role) {
    case "teacher":
      ctx.body = await getSessions(ctx.params.examId);
      break;
    case "student":
      ctx.body = await getSessions(ctx.params.examId).where({
        student_class: loggedUser.student_class,
      });
      break;
  }
});


router.post("/", async (ctx) => {
    ctx.accepts("json");
    const session = await addSession(ctx.request.body as Session);
    ctx.response.body = session;
})

export default router;
