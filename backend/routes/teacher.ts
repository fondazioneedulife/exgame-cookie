import Router from "@koa/router";
import { Teacher } from "../../api-types";
import {add, edit, index, remove, view } from "../services/teacher";

const router = new Router({
    prefix:"/teachers",
});

//all teacher
router.get("/", (ctx) => {
    ctx.body = index();
});

//find teacher
router.get("/:id", (ctx) => {
    ctx.body = view(ctx.params.id);
});

//ADD a new Teacher
router.post("/", (ctx) => {

});

//edit teacher
router.put("/:id", (ctx) => {
});

//delete teacher
router.delete("/:id", (ctx) => {
});

export default router 