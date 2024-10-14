import { Teacher } from "../../api-types";

const DB: Teacher[] = [];

export const index = () => {
    return DB;
};

export const view = (id: string) => {
    return DB.find((t) => t._id === id);
};

export const add = (newTeacher: Teacher) => {
    DB.push(newTeacher);
    return newTeacher;
};

export const edit = (teacher: Teacher) => {
    const index = DB.find((t) => t._id === teacher._id);

    if(!index) {
        throw new Error(`Teacher not found: ${teacher._id}`);
    }

    const updatedDocument = { ...index, ...teacher };

    DB.forEach((t, i) => {
        if (t._id === updatedDocument._id) {
            DB[i] = updatedDocument;
        }
    });

};

export const remove = (id: string) => {
    const index = DB.findIndex((t) => t._id === id);
    if (index > -1) {
        DB.splice(index, 1);
    }
};

