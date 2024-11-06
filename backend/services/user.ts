import { Role, User, User as UserModel } from "../../api-types";
import DB from "./db";

// const DB: User[] = [];

const userSchema = new DB.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  image: { type: Buffer, required: false }, // Binary data
  subjects: { type: [String], required: false },
  classes: { type: [String], required: false },
  class: { type: String, required: false },
  token: { type: String, required: false, default: null },
});

const UserModel = DB.model("user", userSchema);

export const index = async () => {
  return UserModel.find({});
};

export const getUsersByRole = async (role: Role) => {
  return UserModel.find({ role });
};

export const view = async (id: string) => {
  return UserModel.findById(id);
};

export const add = async (user: User) => {
  const UserData = new UserModel(user);
  return UserData.save();
};

export const edit = async (id, user: User) => {
  const UserDocument = await UserModel.findById(id);

  if (!UserDocument) {
    throw new Error(`Can't find user by id: ${user._id}`);
  }

  UserDocument.set(user);
  return UserDocument.save();
};

export const remove = async (id: string) => {
  return UserModel.deleteOne({ _id: id });
};

export const getUrlToken = async (id: string) => {
  
  try {
    const user = await UserModel.findById(id);

    if (user && user.token) {
      return user.token;
    } else {
      console.log("Utente non trovato o campo token mancante");
      return null;
    }
    
  } catch (error) {
    console.error("Errore nella ricerca dell'utente:", error);
    return null;
  }
  
}; 