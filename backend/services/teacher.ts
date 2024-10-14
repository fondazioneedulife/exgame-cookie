import { Teacher } from "../../api-types"


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
    if (!document) {
        throw new Error(`Can't find teacher by id: ${teacher._id}
            `);
    }
    
    const updatedDocument = { ...document, ...teacher };
    
    DB.forEach((el,i) => {
        if (el._id === updatedDocument._id) {
            DB[i] = updatedDocument;
        }
    });   
};


export const remove = (id: string) => {
    DB.forEach ((el, i) => {
        if (el._id === id) {
            DB.splice(i, 1);
        }
    });
};