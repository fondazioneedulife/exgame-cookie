import { User, Role} from "../../api-types";
import DB from "./db";

const userSchema = new DB.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String , enum:[ "admin", "teacher", "student" ], required: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  subject: {type: [String], required: false},
  classes: {type: [String], required: false},
  student_class: { type: String, required: false },
  image: { type: String, required: false },
})

// const userSchema = new DB.Schema({
//   first_name: String, 
//   last_name: String,
//   email: String, 
//   password: String,
//   role: String,
//   created_at: String,
//   updated_at: String,
//   subject: [String],
//   classes: [String],
//   student_class: String,
//   image: String,
// })

const UserModel = DB.model("users", userSchema);

export const index = async() => {
    return UserModel.find({});
};

export const getUsersByRole = async(role: Role) => {
  return UserModel.find({ role });
}

export const getUsersWithoutClass = async() => {
  return UserModel.find({ role: "student", student_class: null });  
}

export const add = async(user: User) => {
    const newUser = new UserModel(user);
    return newUser.save();
};

export const view = async(id: string) => {
    return UserModel.findById({ id });
};

export const edit = async(id, user: User) => {
    console.log(id, user);
    // const document = UserModel.findOneAndUpdate({ _id: id }, {user}, {new: true});
  
    // if(!document){
    //     throw new Error(`Can't find user by id: ${user._id}`);
    // }
};

export const remove = async(id: string) => {
    return UserModel.deleteOne({id})
};