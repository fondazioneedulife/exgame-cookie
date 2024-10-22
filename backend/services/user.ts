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

export const getUsersByRole = async (role: Role) => {
    return User.find({role: role});
};

export const view = (id: string) => {
    return User.find({_id: id});
};

export const add = async (teacher: User) => {
    const newUser = new User(teacher);
    await newUser.save();
};

export const edit = async (user: User) => {
    const document = await User.findById(user._id);
    if (!document) {
        throw new Error(`Can't find user by id: ${user._id}`);
    }

    const updatedDocument = await User.findByIdAndUpdate(
        user._id,       
        { $set: user },  
        { new: true }     
    );
    return updatedDocument; 
};

export const remove = async (id: string) => {
    const user = await User.findById(id);
    const deleted = await User.deleteOne({_id: id})
    return `User deleted ${user}`
};