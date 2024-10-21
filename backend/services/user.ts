import { Role, User } from "../../api-types";
import DB from "./db"

// const DB: User[] = [];
const userSchema = new DB.Schema({
    _id: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    subject: [],  // Opzionale per i teacher
    classes: [],  // Opzionale per i teacher
    student_class: String,  // Opzionale per gli student
    image: String,  // Campo opzionale
    created_at: Date,
    updated_at: Date,
    role: String,
});

const User = DB.model('user', userSchema)

export const index = async () => {
    return User.find({});
};
// export const getUsersByRole = (role: Role) => {
//     return DB.filter((el) => el.role === role);
// };

// export const view = (id: string) => {
//     return DB.find((el) => el._id === id);
// };

export const add = async (teacher: User) => {
    const newUser = new User(teacher);
    await newUser.save();
};

// export const edit = (teacher: User) => {
//     const document = DB.find((el) => el._id === teacher._id);
    
//     if(!document){
//         throw new Error(`Can't find teacher by id: ${teacher._id}`);
//     }

//     const updateDocument = { ...document, ...teacher };

//     DB.find((el, i) => {
//         if(el._id === updateDocument._id){
//             DB[i] = updateDocument;
//         }
//     });
// };

// export const remove = (id: string) => {
//     DB.forEach((el, i) => {
//         if(el._id === id){
//             DB.splice(i, 1);
//         }
//     });
// };