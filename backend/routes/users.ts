import Router from '@koa/router';
import { User, User as UserModel } from "../../api-types";
import { index, add, edit, remove, view } from '../services/user';
import { isAdmin, isStudent } from '../mock/mockLoggedUser'; // Assicurati di importare correttamente la funzione isAdmin

const router = new Router();

const isAdminMiddleware = async (ctx, next) => {
  const is_admin = isAdmin();
  if (is_admin) {
    await next();
  } else {
    ctx.status = 401;
    ctx.response.body = "user non autorizzato";
  }
};

// Get all users
router.get("/", isAdminMiddleware, async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

// Get a user by ID
router.get("/:id", async (ctx) => {
  const loggedUser = getmockLoggedUser()
  console.log(loggedUser.role)
  let user;
  switch(loggedUser.role){
    case "admin":
       user = await viewForAdmin(ctx.params.id);
      break
    case "teacher":
      user = await viewForTeacher(ctx.params.id);
      break
    case "student":
      user = await viewForStudent(ctx.params.id);
      break
  }
  if (!user) {
    // User not found
    ctx.status = 404;
    return;
  }

  ctx.body = user;
});

// Add a user
router.post("/", isAdminMiddleware, async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// Edit a user
router.put("/:id", isAdminMiddleware, async (ctx) => {
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as User);
  ctx.response.body = response;
});

// Delete a user
router.delete("/:id", isAdminMiddleware, async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default router;