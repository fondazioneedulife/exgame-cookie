import { Schema } from "mongoose";
import { Role, User } from "../../api-types";
import DB from "./db";

// const DB: User[] = [];

const userSchema = new DB.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  created_at: String,
  updated_at: String,
  role: String,
});

const UserModel = DB.model("user", userSchema);

export const index = async () => {
  return UserModel.find();
};

export const getUsersByRole = (role: Role) => {
  return UserModel.findOne((el) => el.role === role);
};

export const view = (id: string) => {
  return UserModel.find((el) => el._id === id);
};

export const add = (user: User) => {
  UserModel.insertMany(user);
};

// export const edit = (user: User) => {
//   const document = DB.find((el) => el._id === user._id);

//   if (!document) {
//     throw new Error(`Can't find teacher by id: ${user._id}`);
//   }

//   const updateDocument = { ...document, ...user };

//   DB.find((el, i) => {
//     if (el._id === updateDocument._id) {
//       DB[i] = updateDocument;
//     }
//   });
// };

// export const remove = (id: string) => {
//   DB.forEach((el, i) => {
//     if (el._id === id) {
//       DB.splice(i, 1);
//     }
//   });
// };
