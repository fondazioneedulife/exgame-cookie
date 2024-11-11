import Router from "@koa/router";
import { Role, User } from "../../api-types";
import { isAdmin, getmockLoggedUser } from "../mock/mockLoggedUser";
import { editHandler } from "./handlers/editHanndler";
import { viewHandler } from "./handlers/viewHandler";
import {
  add,
  getUsersByRole,
  index,
  remove,
  viewForAdmin,
  getUsersWithoutClass,
  getMyStudents,
} from "../services/user";

const router = new Router({
  prefix: "/users",
});

const isAdminMiddleware = async (ctx, next) => {
  const is_admin = await isAdmin();
  if (is_admin) {
    await next();
  } else {
    ctx.status = 401;
    ctx.response.body = "user non autorizzato";
  }
};

// All routes
router.get("/", async (ctx) => {
  const all = await index();
  ctx.response.body = all;
});

router.get("/role/:role",isAdminMiddleware, async (ctx) => {
  ctx.body = await getUsersByRole(ctx.params.role as Role);
});

// Find a user
router.get("/:id", async (ctx) => {
 const viewUser = viewHandler(ctx.params.id);
  ctx.body = viewUser;
});

// Find all students without a class
router.get("/students-without-class" , async(ctx) =>{
    const loggedUser = await getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.body = await getUsersWithoutClass();
            break;
        case "teacher":
            ctx.body = await getUsersWithoutClass();
            break;
        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }
});

//find all the students in the classes taught by a teacher.
router.get("/my-students", async(ctx) =>{
    
    const loggedUser = await getmockLoggedUser();
    console.log(loggedUser.role);

    switch(loggedUser.role){
        case "admin":
            ctx.status = 400;
            ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            break;

        case "teacher":
            const classes = loggedUser.classes;
            if (classes && classes.length !== 0) {
             /*    ctx.body = await getMyStudents(classes); */
            } else {
                ctx.status = 400;
                ctx.response.body = { message: "Non hai nessuno studente assegnato alle tue classi." };
            }
            break;

        case "student":
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;

        default:
            ctx.status = 401;
            ctx.response.body = "utente non autorizzato";
            break;
    }
});

// Add a user
router.post("/", async (ctx) => {
  ctx.accepts("json");
  const user = await add(ctx.request.body as User);
  ctx.response.body = user;
});

// Edit a user
router.put("/:id", async (ctx) => {
  ctx.accepts("json");
  const editUser = await editHandler(ctx);
  ctx.response.body = editUser;
});

// Delete a user
router.delete("/:id",isAdminMiddleware, async (ctx) => {
  ctx.body = await remove(ctx.params.id);
});

export default router;




/* #ADMIN
GET /users
mostra l'elenco di tutti gli utenti (admin, studenti e insegnanti)

GET /users/{id}
ottiene i dettagli di un singolo utente

GET /users/role/{role}
mostra l'elenco di tutti gli utenti con un determinato ruolo

GET /users/students-without-class
mostra la lista di tutti gli student senza una class assegnata

PUT /users/{id}
modifica i dati di un'utente

DELETE /users/{id}
elimina un'utente

--bonus--

GET /classes
mostra la lista di tutte le classi

GET /classes/{class}
mostra la lista di tutti gli studenti presenti in una determinata classe



#TEACHER
GET /users/my-students 
un teacher ottiene tutti gli studenti delle classi in cui lui insegna

GET /users/{id}
può accedere al profilo di tutti gli studenti delle classi in cui lui insegna

GET /users/students-without-class
mostra la lista di tutti gli student senza una class assegnata

GET /classes
mostra la lista di tutte le classi del teacher

GET /classes/{class}
mostra la lista di tutti gli studenti presenti in quella classe

PUT /users/{id}
un teacher può modificare i suoi dati ed assegnare la classe ad uno student



#STUDENTS
GET /users/class-mates
ottiene i compagni di classe di uno studente

GET /users/{id}
ottiene i dettagli del proprio profilo

PUT /users/{id}
modifica i dettagli del proprio profilo */