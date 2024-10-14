import Router from "@koa/router";
import { Teacher } from  "../../api-types";
import { add, edit, index, remove, view } from "../services/teacher";


const router = new Router({
    prefix: "/teachers",
});

router.get("/", (ctx) => {
    ctx.body = index();
});

router.get("/:id", (ctx) => {
    ctx.body = view(ctx.params._id);
})

router.post("/", (ctx) => {
    ctx.accepts("json");
    add(ctx.request.body as Teacher);
    ctx.response.body = ctx.request.body;
})

router.put("/:id", (ctx) => {
    ctx.accepts("json");
    edit(ctx.request.body as Teacher);
    ctx.response.body = ctx.request.body;
})

router.delete("/:id", (ctx) => {
    ctx.body = remove(ctx.params._id)
})

export default router;