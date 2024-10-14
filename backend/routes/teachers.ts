import Router from "@koa/router"
import { Teacher } from "../../api-types";
import { add, edit , index, remove, view } from "../services/teacher";

const router = new Router({
    prefix:"/teachers",
});

router.get("/", (ctx)=> {
    ctx.body="hello";
});
//all teacher
router.get("/", (ctx)=>{
    ctx.body= index();
});

//find a teacher
router.get("/:id", (ctx)=> {
    ctx.body = view(ctx.params.id);
});

//add a new teacher©
router.post("/", (ctx)=> {
    ctx.accepts("json");
    add(ctx.request.body as Teacher);
    ctx.response.body = ctx.request.
    body;
});
//Edit teacher
router.put("/:id", (ctx)=> {
});

router.delete("/:id", (ctx)=> {

});

export default router;

