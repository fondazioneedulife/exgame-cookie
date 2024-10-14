// logiche backend
import { error } from "console";
import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

// index mi deve dare tutta la lista dei teachers per cui
export const index = () => {
    return DB;
};

export const view = (id:string) => {
    return DB.find((el) => el._id === id);
};

export const add = (teacher:Teacher) => {
    DB.push(teacher);
};

export const edit = (teacher:Teacher) => {
    const document = DB.find((el) => el._id === teacher._id);
    if (!document){
        throw new Error(`can't find teacher by id: ${teacher._id}`);
    }

    const updateDocument = {...document, ...teacher};
    DB.forEach((el ,i) => {
        if (el._id === updateDocument._id){
            DB[i] = updateDocument;
        }
    })

};
export const remove = (id:string) => {
    DB.forEach((el, i) => {
     if (el._id === id) {
        DB.slice(i, 1);
     }        
    });
};