import DB from "./db";
import { User } from "../../api-types";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Numero di round per hashing della password

// Definisci lo schema del modello User
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

// Login
export const login = async (email: string, password: string) => {
  // Trova l'utente per email
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return null;
  }

  // Confronta la password fornita con quella memorizzata
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;
};

// Sign-up per student
export const registerStudent = async (data: Partial<User>) => {
  // Cripta la password prima di salvarla
  const hashedPassword = await bcrypt.hash(data.password!, SALT_ROUNDS);

  const newStudent = {
    ...data,
    password: hashedPassword,
    role: "student",
    created_at: new Date().toISOString(),
  };

  const student = new UserModel(newStudent);
  return student.save();
};

// Find user by email and password
export const findByEmailAndPassword = async (email: string, password: string) => {
  return UserModel.findOne({ email, password });
};