import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

export const index = () => {
};

export const view = (id:string) => {
    return DB.find((el) => el._id ===id);
};

export const add = (teacher: Teacher) => {
};

export const edit = (teacher: Teacher) => {
    //find codument
    const document = DB.find((el)=> el._id === teacher._id);
    if(!document){
        throw new Error(`Can't find teacher by id: ${teacher._id}`);
    }
    
    //create update document
    const updateDocument = {...document, ...teacher};
    
    //insert the new documentt in the database
    DB.forEach((el, i) => {
        if(el._id === updateDocument._id){
            DB[i] = updateDocument;
        }
    })
};



export const remove = (id:string) => {
    DB.forEach((el, i) => {
        if(el._id === id){
            DB.splice(i, 1);
        }
    })
};