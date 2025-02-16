import { Class } from "../../api-types";
import DB from "./db";

const classSchema = new DB.Schema<Class>({
  // _id: String,
  name: String,
});

export const ClassModel = DB.model("class", classSchema);

//READ
export const getAllClasses = async () => {
  return ClassModel.find({});
};

export const getNameOfClass = async (classId: String) => {
  return ClassModel.findById(classId);
};

//create
export const createClass = async (newClass: Partial<Class>) => {
  const classDocument = new ClassModel(newClass);
  return classDocument.save();
};

//modify
export const editClass = async (id: String, newClass: Partial<Class>) => {
  const opt = { new: true, runValidators: true };
  try {
    const classDocument = await ClassModel.findByIdAndUpdate(
      id,
      { $set: newClass },
      opt,
    );
    return classDocument;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della classe:", error);
    throw new Error(error.message);
  }
};

//delete
export const deleteClass = async (id: String) => {
  try {
    const classToDelete = await ClassModel.findById(id);

    if (!classToDelete) {
      return { success: false, message: "Utente non trovato" };
    }

    const result = await ClassModel.deleteOne({ _id: id });
    return { success: true, message: "Classe eliminato correttamente", result };
  } catch (error) {
    console.error("Errore durante l'eliminazione della classe:", error);
    return {
      success: false,
      message: "Errore durante l'eliminazione della classe",
    };
  }
};

//TODO FIX THE SUCCESIVE FUNCTIONS ⇂
// export const getStudentsOfClass = async (studentClass: string) => {
//   return await UserModel.find(
//     { role: "student", student_class: studentClass },
//     { first_name: 1, last_name: 1, _id: 1 },
//   );
// };

// export const getUsersWithoutClass = async () => {
//   return UserModel.find({ role: "student", student_class: null });
// };

// export const getMyStudents = async (teacher_classes: string[]) => {
//   return UserModel.find({ student_class: { $in: teacher_classes } });
// };
