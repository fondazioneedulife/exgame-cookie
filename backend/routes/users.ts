import Router from "@koa/router";
import { Role, User } from "../../api-types";
import {
  add,
  edit,
  editYorself,
  getUsersByRole,
  index,
  remove,
  view,
  getUsersWithoutClass,
  getMyStudents

} from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware, isAdminMiddleware, isAdminOrTeacherMiddleware} from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/users",
});

router.use(authMiddleware());

// All users
router.get("/", isAdminMiddleware, async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/me", async (ctx) => {
  ctx.response.body = ctx.session.user;
});

router.get("/role/:role", isAdminMiddleware, async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find all students without a class
router.get("/students-without-class", isAdminOrTeacherMiddleware, async (ctx) => {
  ctx.body = await getUsersWithoutClass();
});

//find all the students in the classes taught by a teacher.
router.get("/my-students", async (ctx) => {
  const loggedUser = ctx.session.user;

  switch (loggedUser.role) {
    case "admin":
      ctx.status = 400;
      ctx.response.body = {
        message: "You have no class assigned",
      };
      break;

    case "teacher":
      const classes: string[] | undefined = loggedUser.teacher_classes;
      if (classes && classes.length !== 0) {
        ctx.body = await getMyStudents(classes);
      } else {
        ctx.status = 400;
        ctx.response.body = {
          message: "You have no students assigned to your classes",
        };
      }
      break;
    
    case "student":
    default:
      ctx.status = 403;
      ctx.response.body = "forbidden";
      break;
  }
});


// Find a user
router.get("/:id", async (ctx) => {
  const user = await view(ctx.params.id, ctx.session.user);

  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Edit a user
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const loggedUser = ctx.session.user
  let response;
  
  switch (loggedUser.role) {
    case "admin":
      console.log('admin')
      response = await edit(ctx.params.id, ctx.request.body as User);
      break;
    case  "student":
    case "teacher":
      console.log('teacher')
      if (ctx.params.id == loggedUser._id) {
        response = await editYorself(loggedUser._id, ctx.request.body as User);
      } else {
        ctx.status = 403;
        response = "non puoi modificare un'altro utente";
      }
      break;  
    default:    
      ctx.status = 403;
      response = "utente non autorizzato";
      break;
  }
  ctx.response.body = response;
});

// Delete a user
router.delete("/:id", async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default router;
