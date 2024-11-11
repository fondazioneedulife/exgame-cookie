import Router from "@koa/router";
import { Exam } from "../../api-types/exam";
import {
  add,
  index,
  view,
  edit,
  remove,
} from "../services/exam";

const router = new Router({
  prefix: "/exams",
});

// All exams
router.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});


// get exam by id
router.get("/:id", async (ctx) => {
  const exam = await view(ctx.params.id);

  if (!exam) {
    // exam not found
    ctx.status = 404;
    return;
  }

  ctx.body = exam;
});

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.body as Exam);
  ctx.response.body = user;
});

// // Edit a user
// router.put("/:id", async (ctx) => {
//   ctx.accepts("json");
//   const response = await edit(ctx.params.id, ctx.request.body as User);
//   ctx.response.body = response;
// });

// // Delete a user
// router.delete("/:id", async (ctx) => {
//   ctx.body = await remove(ctx.params.id);
// });

export default router;
