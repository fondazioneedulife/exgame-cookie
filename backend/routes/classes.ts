import Router from "@koa/router";
import { getAllClasses, getStudentsOfClass } from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/classes",
});

// questo middleware serve a controllare che tu sia loggato prima di mostrarti la pagina
//se lo tolgo, mostra la pagina ancje se non sono loggato
router.use(authMiddleware());

//get all classes / if teacher get your classes
router.get("/", async (ctx) => {
  const currentUser = ctx.session.user;

  switch (currentUser.role) {
    case "admin":
      ctx.body = await getAllClasses();
      break;
    case "teacher":
      ctx.body = currentUser.teacher_classes;
      break;
    case "student":
    default:
      ctx.status = 403;
      ctx.response.body = "forbidden";
      break;
  }
});

//view all student of a class
router.get("/:class", async (ctx) => {
  const currentUser = ctx.session.user;
  console.log("User role:", currentUser.role);

  switch (currentUser.role) {
    case "admin":
    case "teacher":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "student":
      if(ctx.params.class == currentUser.student_class){
        ctx.body = await getStudentsOfClass(ctx.params.class);
      }else{
        ctx.status = 403;
        ctx.response.body = "forbidden";
      }
      break;
      
    default:
      ctx.status = 403;
      ctx.response.body = "forbidden";
      break;
  }
});

export default router;