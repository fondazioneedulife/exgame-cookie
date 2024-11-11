import Router from "@koa/router";
import {
    index,
    getExamById,
    getExamByClass,
    add,
    edit,
    remove
}from "../services/exam";

const router = new Router();

//All routes

router.get("/exams", async (ctx) => {
    const all = await index();
    ctx.response.body = all;
})

