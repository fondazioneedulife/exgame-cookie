import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

export const index = () => {
    return DB;
};

export const view = (id : string) => {
    DB.find((el) => el._id === id);
};

export const add = (teacher : Teacher) => {
    DB.push(teacher);
};

export const edit = (teacher : Teacher) => {
    const document = DB.find((el) => teacher._id === el._id)
    if(!document){
        console.log("errore");
    }
    const updatedDocument = {...document,...teacher};

    DB.forEach((el, i) => {
        if (updatedDocument._id === el._id){
        DB[i] = updatedDocument;
        }
    });
    
};

export const remove = (id : string) => {
    DB.forEach((el, i) => {
        if(el._id === id){
            DB.splice(i ,1);
        }
    })
};