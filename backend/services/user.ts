import { Role, User, User as UserModel } from "../../api-types";
import { getmockLoggedUser } from "../mock/mockLoggedUser";
import DB from "./db";

// const DB: User[] = [];

const timestamp = Date.now();

const userSchema = new DB.Schema({
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  image: { type: Buffer, required: false }, // Binary data
  subjects: { type: [String], required: false },
  teacher_classes: { type: [String], required: false },
  student_class: { type: String, required: false },
  token: { type: String, required: false, default: null },
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
  let user = await UserModel.findById(id);
  return user;
};

export const viewForTeacher = async (id: string, teacher_classes: string[]) => {
  return UserModel.find({ _id: id, student_class: { $in: teacher_classes } });
};

export const viewForStudent = async (id: string) => {
  return UserModel.findById(id);
};

//---------------ADD USER------------------------
export const add = async (user: User) => {
  const UserData = new UserModel(user);
  UserData.role = "student";
  return UserData.save();
};

//UPDATE
export const edit = async (id, user: User) => {
  user.updated_at = timestamp;
  const opt = { new: true, runValidators: true };

  try {
    const userDocument = await UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      opt,
    );
    return userDocument;
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'utente:", error);
    throw new Error(error.message);
  }
};

export const editYorself = async (id, user: User) => {
  const allowedUpdates = [
    "first_name",
    "second_name",
    "email",
    "image",
    "subject",
    "teacher_classes",
  ];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (user[field] !== undefined) {
      updates[field] = user[field];
    }
  });

  console.log(updates);
  user.updated_at = timestamp;
  const opt = { new: true, runValidators: true };

  try {
    const userDocument = await UserModel.findByIdAndUpdate(
      id,
      { $set: updates },
      opt,
    );
    return userDocument;
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'utente:", error);
    throw new Error(error.message);
  }
};

export const assignClass = async (id, currentClass) => {
  const user = {};
  user["student_class"] = currentClass;
  user["updated_at"] = timestamp;

  const opt = { new: true, runValidators: true };

  try {
    const userDocument = await UserModel.find(
      { _id: id, student_class: null },
      { $set: user },
      opt,
    );
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
    return {
      success: false,
      message: "Errore durante l'eliminazione dell'utente",
    };
  }
};

//-------------------------------- CLASS ---------------------------------

//READ
export const getAllClasses = async () => {
  return UserModel.find({});
};

/**
 * get students with only:
 *  - _id
 *  - first_name
 *  - last_name
 */

export const getStudentsOfClass = async (studentClass: string) => {
  return await UserModel.find(
    { role: "student", student_class: studentClass },
    { first_name: 1, last_name: 1, _id: 1 },
  );
};

export const getUsersWithoutClass = async () => {
  return UserModel.find({ role: "student", student_class: null });
};

export const getMyStudents = async (teacher_classes: string[]) => {
  return UserModel.find({ student_class: { $in: teacher_classes } });
};
