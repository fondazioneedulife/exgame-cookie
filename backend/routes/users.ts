import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { isAdmin, getmockLoggedUser } from "../mock/mockLoggedUser";
import { editHandler } from "./handlers/editHanndler";
import { viewHandler } from "./handlers/viewHandler";
import {
  add,
  getUsersByRole,
  index,
  remove,
  getUsersWithoutClass,
  assignClass,
  getMyStudents,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});

const isAdminMiddleware = async (ctx, next) => {
  const is_admin = await isAdmin();
  if (is_admin) {
    await next();
  } else {
    ctx.status = 401;
    ctx.response.body = "user non autorizzato";
  }
};

// All routes
router.get("/", isAdminMiddleware , async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/role/:role", isAdminMiddleware, async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find all students without a class
router.get("/students-without-class", async (ctx) => {
  const loggedUser = await getmockLoggedUser();

  switch (loggedUser.role) {
    case "admin":
      ctx.body = await getUsersWithoutClass();
      break;
    case "teacher":
      ctx.body = await getUsersWithoutClass();
      break;
    case "student":
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

//find all the students in the classes taught by a teacher.
router.get("/my-students", async (ctx) => {
  const loggedUser = await getmockLoggedUser();

  switch (loggedUser.role) {
    case "admin":
      ctx.status = 400;
      ctx.response.body = {
        message: "Non hai nessuno studente assegnato alle tue classi.",
      };
      break;

    case "teacher":
      const classes: string[] | undefined = loggedUser.teacher_classes;
      // TODO: tipo da assegnare
      if (classes && classes.length !== 0) {
        ctx.body = await getMyStudents(classes);
      } else {
        ctx.status = 400;
        ctx.response.body = {
          message: "Non hai nessuno studente assegnato alle tue classi.",
        };
      }
      break;

    case "student":
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

router.put("/assign-class/:id", async (ctx) => {
  const loggedUser = await getmockLoggedUser();

  const currentClass = ctx.request.body.class;

  switch (loggedUser.role) {
    case "admin":
      ctx.body = await assignClass(ctx.params.id, currentClass);
      break;
    case "teacher":
      ctx.body = await assignClass(ctx.params.id, currentClass);
      break;
    case "student":
    default:
      ctx.status = 401;
      ctx.response.body = "utente non autorizzato";
      break;
  }
});

// Edit a user
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const editUser = await editHandler(ctx);
  ctx.response.body = editUser;
});

// Delete a user
router.delete("/:id", isAdminMiddleware, async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

// Find a user
router.get("/:id", async (ctx) => {
  const viewUser = await viewHandler(ctx);
  ctx.body = viewUser;
});

export default router;
