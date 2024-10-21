import { Role, user } from "../../api-types";
import db from "./db";

//const DB: user[] = [];

const userSchema= new DB.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    created_at:String,
    upadate_at:String,
    role:String,
});

const user = DB.Schema("user", userSchema);

/* export const index = () => {
    return DB;
};

export const getUserByRole =(role: Role)=> {
    return DB.filter((el)=> el.role === role);
};

export const view = (id: string) => {
    return DB.find((el) => el._id === id);
};

export const add = (teacher: user) => {
    DB.push(teacher);
};

export const edit = (teacher: user) => {
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
}; */