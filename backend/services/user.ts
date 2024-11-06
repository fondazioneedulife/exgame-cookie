import { User, Role} from "../../api-types";
import DB from "./db";

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
})

export const UserModel = DB.model("users", userSchema);

//READ
export const index = async() => {
    return UserModel.find({});
};

export const getUsersByRole = async(role: Role) => {
  return UserModel.find({ role });
}

export const getUsersWithoutClass = async() => {
  return UserModel.find({ role: "student", student_class: null });  
}

export const view = async( id: string ) => {
  return UserModel.findById({ id });
};

export const getMyStudets = async(classes: string[]) => {
  return UserModel.find({class: { $in: classes}});
}

//CREATE
export const add = async( user: User ) => {
  const newUser = new UserModel(user);
  return newUser.save();
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

//DELETE
export const remove = async(id: string) => {
  return UserModel.deleteOne({ _id: id })
};

//-------------------------------- CLASS ---------------------------------

//READ
export const getAllClasses = async() => {
  return UserModel.find({});
};

export const getStudentsOfClass = async(theClass: string) => {
  return UserModel.find({role: "student", class: theClass});
};  3
