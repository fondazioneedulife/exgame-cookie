import { Role, User } from "../../api-types";
import { SessionUser } from "../types/session";
import DB from "./db";

const userSchema = new DB.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
    },
    image: { type: Buffer, required: false }, // Binary data
    subjects: { type: [String], required: false },
    teacher_classes: { type: [String], required: false },
    student_class: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const UserModel = DB.model("user", userSchema);

export const index = async () => {
  return UserModel.find({});
};

export const getUsersByRole = async (role: Role) => {
  return UserModel.find({ role }).select('first_name last_name email role image');
};

//---------------VIEW BY ID------------------------
export const viewForAdmin = async (id: string) => {
  let user = await UserModel.findById(id);
  return user;
};

export const viewForTeacher = async (id: string, teacher_classes: string[]) => {
  return UserModel.find({ _id: id, student_class: { $in: teacher_classes }  });
};

export const viewForStudent = async (id: string, student_class: string | undefined) => {
  return UserModel.find({ _id: id, student_class: student_class});
};

export const viewYourself = async (id: string) => {
  return UserModel.findById({id});
};

/**
 * Returns a user by id, if currentUser is provided, applies visibility rules
 *
 * @param id
 * @param currentUser if provided, applies appropriate logic for current user
 * @returns
 */
export const view = async (id: string, currentUser?: SessionUser) => {
  switch (currentUser?.role) {
    case "admin":
      return UserModel.findById(id);
    case "teacher":
      if (
        currentUser.teacher_classes &&
        currentUser.teacher_classes.length > 0
      ) {
        return UserModel.find({
          _id: id,
          student_class: { $in: currentUser.teacher_classes },
        }).select('first_name last_name email role image subjects teacher_classes');
      } else {
        return []; // Restituisce un risultato vuoto se teacher_classes non è presente o è vuoto
      }
    case "student":
      if (currentUser.student_class) {
        return UserModel.find({
          _id: id,
          student_class: currentUser.student_class,
        }).select('first_name last_name email role student_class');
      } else {
        return []; // Restituisce un risultato vuoto se student_class non è presente
      }
    default:
      throw new Error("Unauthorized");
  }
};

//---------------ADD USER------------------------
export const add = async (
  user: Omit<User, "_id" | "created_at" | "updated_at">,
) => {
  const UserData = new UserModel(user);
  UserData.role = "student"; // force student role for new users
  return UserData.save();
};

//------------------UPDATE------------------------
export const edit = async (id, user: Partial<User>) => {
  /**
   * https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
   * https://mongoosejs.com/docs/tutorials/findoneandupdate.html
   * NEW = [options.new=false] «Boolean» if true, return the modified document rather than the original
   *       As an alternative to the new option, you can also use the returnOriginal option. 
   *       returnOriginal: false is equivalent to new: true. 
   *       The returnOriginal option exists for consistency with the the MongoDB Node.js driver's findOneAndUpdate(), 
   *       which has the same option.
   * 
   * https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
   * RUNVALIDATORS = [options.runValidators] «Boolean» if true, runs update validators on this command. Update validators validate the update operation against the model's schema
   */
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

export const editYorself = async (id, user: Partial<User>) => {
  const allowedUpdates = [
    "first_name",
    "last_name",
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

export const assignClass = async (id: string, currentClass: string) => {
  const user = {} as User;
  user["student_class"] = currentClass;

  const opt = { new: true, runValidators: true };

  try {
    await UserModel.updateOne(
      { _id: id, student_class: null },
      { $set: user },
      opt,
    );
    return {
      success: true,
      message: `Assegnazione della classe ${user.student_class} avvenuta correttamente.`,
    };
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
  return UserModel.distinct('student_class');
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

// export const viewYourself = async (currentUser: SessionUser) => {
//   const id = currentUser._id
//   return UserModel.findById({id});
// };