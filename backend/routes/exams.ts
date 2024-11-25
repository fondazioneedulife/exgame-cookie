import Router from "@koa/router";
import { Exam } from "../../api-types/exam";
import { add, edit, index, remove, view } from "../services/exam";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/exams",
});

router.use(authMiddleware());

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

// Add an exam
router.post("/", async (ctx) => {
  ctx.accepts("json");
  console.log(ctx.body);
  const exam = await add(ctx.request.body as Exam);
  ctx.response.body = exam;
});

// Edit an exam
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const response = await edit(ctx.params.id, ctx.request.body as Exam);
  ctx.response.body = response;
  console.log(response);
});

// // Delete a user
router.delete("/:id", async (ctx) => {
  ctx.body = await remove(ctx.params.id);
  console.log(`exam with id:${ctx.params.id} DELETED.`);
});

export default router;
