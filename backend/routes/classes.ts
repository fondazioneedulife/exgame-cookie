import Router from "@koa/router";
import { User } from "../../api-types";
import { getmockLoggedUser } from "../mock/mockLoggedUser";
import { getAllClasses, getStudentsOfClass } from "../services/user";

const router = new Router({
  prefix: "/classes",
});

//get all classes / if teacher get your classes
router.get("/", async (ctx) => {
  const loggedUser = await getmockLoggedUser();
  console.log(loggedUser.role);

  switch (loggedUser.role) {
    case "admin":
      ctx.body = await getAllClasses();
      break;
    case "teacher":
      ctx.body = loggedUser.teacher_classes;
      break;
    case "student":
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

//view all student of a class
router.get("/:class", async (ctx) => {
  const loggedUser = await getmockLoggedUser();
  console.log(loggedUser.role);

  switch (loggedUser.role) {
    case "admin":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "teacher":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "student":
		ctx.body = await getStudentsOfClass(ctx.params.class);
		break;
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

export default router;
