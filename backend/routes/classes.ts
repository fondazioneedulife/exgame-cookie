import Router from "@koa/router";
import { getAllClasses, getStudentsOfClass } from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/classes",
});

router.use(authMiddleware());

//get all classes / if teacher get your classes
router.get("/", async (ctx) => {
  const currentUser = ctx.session.user;
  console.log("User role:", currentUser.role);

  switch (currentUser.role) {
    case "admin":
      ctx.body = await getAllClasses();
      break;
    case "teacher":
      ctx.body = currentUser.teacher_classes;
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
  const currentUser = ctx.session.user;
  console.log("User role:", currentUser.role);

  switch (currentUser.role) {
    case "admin":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "teacher":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "student":
      if(ctx.params.class == currentUser.student_class){
        ctx.body = await getStudentsOfClass(ctx.params.class);
      }else{
        ctx.status = 401;
        ctx.response.body = "Non hai i permessi per visualizzare gli altri studenti";
      }
      break;
      
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

export default router;