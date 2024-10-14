import Router from "@koa/router";
import { Teacher } from "../../api-types";
import { add, index, view } from "../services/teacher";


const router = new Router({
    prefix: "/teachers",
});

// All teachers
router.get("/",(ctx) => {
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
    ctx.response.body = ctx.request.
    body;
});

// Edit teacher
router.put("/:id", (ctx) => {

});

// Delete teacher
router.delete("/:id", (ctx) => {

});

export default router;