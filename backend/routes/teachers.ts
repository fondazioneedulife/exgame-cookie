import Router from "@koa/router";


const router = new Router({
    prefix: "/teachers",
});

//all teachers
router.get("/", (ctx) => {
    ctx.body = "Ciao teacher!";
});

//find a teacher
router.get("/:id", (ctx) => {

});

//add new teacher
router.post("/", (ctx) => {

});

//edit teacher
router.put("/:id", (ctx) => {

});

//delete teacher
router.delete("/:id", (ctx) => {

});

export default router;

