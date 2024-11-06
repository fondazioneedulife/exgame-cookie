import { Role, User } from "../../api-types";
import DB from "./db";

// const DB: User[] = [];

const userSchema = new DB.Schema<User>({
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
  return UserModel.find({});
};

export const getUsersByRole = async (role: Role) => {
  return UserModel.find({ role });
};


//---------------VIEW BY ID------------------------
export const viewForAdmin = async (id: string) => {
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
  
  try {
    const userToDelete = await UserModel.findById(id);

    if (!userToDelete) {
      return { success: false, message: "Utente non trovato" };
    }

    if (userToDelete.role === "admin") {
      return { success: false, message: "Non puoi eliminare un altro admin" };
    }

    const result = await UserModel.deleteOne({ _id: id });
    return { success: true, message: "Utente eliminato correttamente", result };
    
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
    return { success: false, message: "Errore durante l'eliminazione dell'utente" };
  }
};
