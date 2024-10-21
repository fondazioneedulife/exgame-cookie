import { Role, User } from "../../api-types";

const DB: User[] = [];

export const index = () => {
    return DB;
};

export const getUsersByRole = (role: Role) => {
    return DB.filter((el) => el.role === role);
};

export const view = (id: string) => {
    return DB.find((el) => el._id === id);
};

export const add = (teacher: User) => {
    DB.push(teacher);
};

export const edit = (teacher: User) => {
    const document = DB.find((el) => el._id === teacher._id);
    
    if(!document){
        throw new Error(`Can't find teacher by id: ${teacher._id}`);
    }

    const updateDocument = { ...document, ...teacher };

    DB.find((el, i) => {
        if(el._id === updateDocument._id){
            DB[i] = updateDocument;
        }
    });
};

export const remove = (id: string) => {
    DB.forEach((el, i) => {
        if(el._id === id){
            DB.splice(i, 1);
        }
    });
};