// teachers.ts al plurale perchè fa riferimento alle collezioni (tabelle) dei database. 
import Router from  "@koa/router";
import { index, view, add, edit, remove } from "../services/teacher"; // va a prendere le const fatte in teacher nella cartella services
import { Teacher } from "../../api-types"


const router = new Router({
    prefix: "/teachers",
});

//All teachers
router.get("/", (ctx) => {
    ctx.body = index(); 
});

//find a teacher
router.get("/:id", (ctx) => {   //con i due punti davanti considere id come parametro, non come stringa. lo valorizza come variabile
    ctx.body = view(ctx.params.id);
});

//add a new teacher
router.post("/", (ctx) => {
    ctx.accepts("json");
    add(ctx.request.body as Teacher);
    ctx.response.body = ctx.request.body; 
});

//edit a teacher
router.put(":id", (ctx) => {
    router.put("/:id", (ctx) => {
        ctx.accepts("json");
        edit(ctx.request.body as Teacher);
        ctx.response.body = ctx.request.body; 
    })
});

//delete a teacher
router.delete("/:id", (ctx) => {

});

export default router;