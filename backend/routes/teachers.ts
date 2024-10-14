import Router from "@koa/router";
import { index, view, add, edit, remove } from "../services/teacher";
import { Teacher } from "api-types";
const router = new Router({
  prefix: "/teachers",
});

router.get("/", (ctx) => {
  ctx.body = index();
});

router.get("/:id", (ctx) => {
  ctx.body = view(ctx.params.id);
});

router.post("/", (ctx) => {
  ctx.accepts("json");
  add(ctx.request.body as Teacher);
  ctx.response.body = ctx.request.body;
});

router.put("/:id", (ctx) => {});

router.delete("/:id", (ctx) => {});

export default router;
