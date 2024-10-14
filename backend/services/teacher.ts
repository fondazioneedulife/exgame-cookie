import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

export const index = () => {
    return DB;

};

export const view = (id: string) => {
    return DB.find((el) => el._id === id);

};

export const add = (teacher: Teacher) => {
    DB.push(teacher);

};

export const edit = (teacher: Teacher) => {
    const document = DB.find((el) => el._id === teacher._id);
    
    if(!document){
        throw new Error(`Can't find teacher by id: ${teacher._id}`);
    }

    const updateDocument = {...document, ...teacher}; // updateDocument è l'unione di tutte le proprietà (...) di document e teacher.
    
    DB.forEach((el, i) => {
        if (el._id === updateDocument._id){
            DB[i] = updateDocument; 
        }
    });

};

export const remove = (id: string) => {
    DB.forEach((el, i) => {
        if (el._id === id){
            DB.splice(i, 1);
        }
    });

};