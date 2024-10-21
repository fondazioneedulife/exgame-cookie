import { Role, User } from "../../api-types";
import DB from "./db";

const userSchema = new DB.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  created_at: String,
  updated_at: String,
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  image: String,
  subjects: [String],
  classes: [String],
});

const User = DB.model("User", userSchema);

export const index = async () => {
  return User.find({});
};

export const getUsersByRole = async (role: Role) => {
  return User.find({ role });
};

export const view = async (id: string) => {
  return User.findById(id);
};

export const add = async (teacher: User) => {
  const newUser = new User(teacher);
  return newUser.save();
};

export const edit = async (teacher: User) => {
  const document = await User.findById(teacher._id);

  if (!document) {
    throw new Error(`Can't find teacher by id: ${teacher._id}`);
  }

  Object.assign(document, teacher);
  return document.save();
};

export const remove = async (id: string) => {
  return User.findByIdAndDelete(id);
};
