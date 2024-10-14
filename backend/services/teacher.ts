import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

export const index = () => {
    return DB;
}

export const view = (id:string) => {
  return DB.find((el) => el._id === id);
}

export const add = (teacher: Teacher) => {
    DB.push(teacher);
}

export const edit = (teacher: Teacher) => {
    const index = DB.find((el) => el._id === teacher._id);
    if(!index){
        throw new Error(`can't find teacher by id : ${teacher._id}`); 
    }
    
    const updatedDocument= {...index, ...teacher};

    DB.forEach((el,i) =>{
        if(el._id === updatedDocument._id){
            DB[i] = updatedDocument;
        }
    })
}

export const remove = (id:string) => {
    const index = DB.findIndex((el) => el._id === id);
    if(index !== -1){
        DB.splice(index,1);
    }
}