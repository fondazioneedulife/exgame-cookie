import Router from "@koa/router";
import { Teacher } from "api-types";
import { add, edit, index, remove, view } from "../services/teacher";

const router = new Router({
  prefix: "/teachers",
});

// All teachers
router.get("/", (ctx) => {
  ctx.body = index();
});

// Find a teacher
router.get("/:id", (ctx) => {
  ctx.body = view(ctx.params.id);
});

// Add a new Teacher
router.post("/", (ctx) => {
  ctx.accepts("json");
  add(ctx.request.body as Teacher);
  ctx.response.body = ctx.request.body;
});

// Edit teacher
router.put("/:id", (ctx) => {
  ctx.accepts("json");
  edit(ctx.request.body as Teacher);
  ctx.response.body = ctx.request.body;
});

// Delete teacher
router.delete("/:id", (ctx) => {
  remove(ctx.params.id);
  ctx.body = "deleted";
});

export default router;
