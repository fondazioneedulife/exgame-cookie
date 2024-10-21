import { User } from "../../api-types";

const DB: User[] = [];

export const index = () => {
    return DB;
};

export const view = (id: string) => {
    return DB.find((el) => el._id === id);
};

export const add = (user: User) => {
    DB.push(user);
};

export const edit = (user: User) => {
    const document = DB.find((el) => el._id === user._id);
    
    if(!document){
        throw new Error(`Can't find user by id: ${user._id}`);
    }

    const updateDocument = { ...document, ...user };

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