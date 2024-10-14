//logiche api
import { Teacher } from "../../api-types";
import { add, edit, index, remove, view } from "../services/teachers";
import  Router  from "@koa/router";

const router = new Router ({
    prefix : "/teachers",
});

router.get("/", (ctx) => {
    ctx.body = index();
});

//find a teacher
router.get("/:id", (ctx) => {
    ctx.body = view(ctx.params.id)
});

// add new teacher
router.post("/", (ctx) => {
    console.log(ctx.request.body)
     ctx.accepts("json");
     add(ctx.request.body as Teacher);
     ctx.response.body = ctx.request.body;
});

// edit teacher
router.put("/:id", (ctx) => {
    ctx.accepts("json");
    edit(ctx.request.body as Teacher);
    ctx.response.body = ctx.request.body;
}); //:id perché dovrò sapere quale modificare, cancellare o prendere

router.delete("/:id", (ctx) => {});

export default router;