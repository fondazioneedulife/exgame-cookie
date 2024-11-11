import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { isAdmin, getmockLoggedUser } from "../mock/mockLoggedUser";
import {
  add,
  edit,
  getUsersByRole,
  index,
  remove,
  viewForAdmin,
  getUsersWithoutClass,
  getMyStudents,
  viewForTeacher,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});

const isAdminMiddleware = async (ctx, next) => {
  const is_admin = isAdmin();
  if (is_admin) {
    await next();
  } else {
    ctx.status = 401;
    ctx.response.body = "user non autorizzato";
  }
};

// All routes
router.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/role/:role", isAdminMiddleware, async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", async (ctx) => {
  const loggedUser = getmockLoggedUser()
  let user;
  
  switch(loggedUser.role){
    case "admin":
      user = await viewForAdmin(ctx.params.id);
      break
    
    case "teacher":
      const classes = loggedUser.classes;
      if (classes && classes.length !== 0) {
        user = await viewForTeacher(ctx.params.id, classes);
      } else {
        ctx.status = 400;
        ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
      }
      break;

    // case "student":
    //   user = await viewForStudent(ctx.params.id);
    //   break 
  }
  if (!user) {
    // User not found
    ctx.status = 404;
  }

  ctx.body = user;
});

// Find all students without a class
router.get("/students-without-class" , async(ctx) =>{
    const loggedUser = getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.body = await getUsersWithoutClass();
            break;
        case "teacher":
          console.log("siamo quiii");
            ctx.body = await getUsersWithoutClass();
            break;
        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }
});

//find all the students in the classes taught by a teacher.
router.get("/my-students", async(ctx) =>{
    
    const loggedUser = getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.status = 400;
            ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            break;

        case "teacher":
            const classes = loggedUser.classes;
            if (classes && classes.length !== 0) {
                ctx.body = await getMyStudents(classes);
            } else {
                ctx.status = 400;
                ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            }
            break;

        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;

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

// Edit a user
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
router.delete("/:id",isAdminMiddleware, async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default router;
