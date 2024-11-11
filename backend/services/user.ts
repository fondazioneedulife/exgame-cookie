import { Role, User } from "../../api-types";
import DB from "./db";

// const DB: User[] = [];

const timestamp = Date.now();

const userSchema = new DB.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String , enum:[ "admin", "teacher", "student" ], required: true},
  created_at: { type: Number, default: timestamp },
  updated_at: { type: Number, default: timestamp },
  subject: {type: [String], required: false},
  classes: {type: [String], required: false},
  student_class: { type: String, required: false },
  image: { type: String, required: false },
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

export const viewForTeacher = async (id: string, classes: string[]) => {
  console.log("viewForTeacher function is running");
  return UserModel.find({_id: id, student_class: { $in: classes}});
};


export const add = async (user: User) => {
  const UserData = new UserModel(user);
  return UserData.save();
};

//UPDATE
export const edit = async( id, user: User ) => {
  user.updated_at = timestamp;
  const opt = { new: true, runValidators: true };
  
  try {

    const userDocument = await UserModel.findByIdAndUpdate(id, { $set: user }, opt);
    return userDocument;

  } catch (error) {
    
      console.error("Errore durante l'aggiornamento dell'utente:", error);
      throw new Error(error.message);
  }
};

export const editYorself = async( id, user: User ) => {

  const allowedUpdates = ["first_name", "second_name", "email", "image", "subject", "classes"];
  const updates = {};

  allowedUpdates.forEach(field => {
    if (user[field] !== undefined) {
      updates[field] = user[field];
    }
  });
  
  user.updated_at = timestamp;
  const opt = { new: true, runValidators: true };
  
  try {

    const userDocument = await UserModel.findByIdAndUpdate(id, { $set: updates }, opt);
    return userDocument;

  } catch (error) {
    
      console.error("Errore durante l'aggiornamento dell'utente:", error);
      throw new Error(error.message);
  }
};

export const assignClass = async ( id, currentClass ) => {
  const user = {};
  user["student_class"] = currentClass;
  user["updated_at"] = timestamp;
  
  const opt = { new: true, runValidators: true };
  
  try {

    const userDocument = await UserModel.find({_id: id, student_class: null}, { $set: user }, opt);
    return userDocument;

  } catch (error) {
    
      console.error("Errore durante l'aggiornamento dell'utente:", error);
      throw new Error(error.message);
  }
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

export const getUsersWithoutClass = async() => {
  console.log("getUsersWithoutClass function is running");
  return UserModel.find({ role: "student", student_class: null });  
}

export const getMyStudents = async(classes: string[]) => {
  return UserModel.find({student_class: { $in: classes}});
}

//-------------------------------- CLASS ---------------------------------

//READ
export const getAllClasses = async() => {
  return UserModel.find({});
};

export const getStudentsOfClass = async(theClass: string) => {
  return UserModel.find({role: "student", student_class: theClass});
};  3
