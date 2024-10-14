import Router from "@koa/router";
import { Teacher } from "../../api-types/teacher";
import { add, edit, index, remove, view } from "../services/teacher";

const router = new Router({
  prefix: "/teachers",
});

// GET all teachers
router.get("/", async (ctx) => {
  const teachers = await index();
  ctx.body = teachers;
});

// GET a teacher
router.get("/:id", async (ctx) => {
  const teacher = await view(ctx.params.id);
  ctx.body = teacher;
});

// POST add a teacher
router.post("/", async (ctx) => {
  ctx.accepts("application/json");
  add(ctx.request.body as Teacher);
  ctx.response.body = ctx.request.body;
});

// PUT edit a teachers
router.put("/:id", async (ctx) => {
  ctx.accepts("application/json");
  const teacher = ctx.request.body as Teacher;
  const updatedTeacher = await edit(ctx.params.id, teacher);
  ctx.body = updatedTeacher;
});

// DELETE a teacher
router.delete("/:id", async (ctx) => {
  await remove(ctx.params.id);
  ctx.status = 204;
});

export default router;
