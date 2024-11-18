import DB from "./db";
import { User } from "../../api-types";
import { UserModel } from "./user";
import { createHmac } from "crypto";
import { Request, Response } from 'express';

const hash = (password: string):string => {
  return createHmac('sha256', process.env.SECURITY_SALT)
  .update(password)
  .digest('hex');
}



// Login
export const login = async (email: string, password: string) => {
  // Trova l'utente per email
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return null;
  }

  const hashedPassword = hash(password);

  // Confronta la password fornita con quella memorizzata
  const isMatch = user.password === hashedPassword;
  if (!isMatch) {
    return null;
  }

  const token = createToken();

  return user;
};

// Register per student
export const registerStudent = async (data: Partial<User>) => {
  // Controllo se l'email esiste già
  const existingUser = await UserModel.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email già registrata. Non è possibile creare un altro utente con la stessa email.");
  }

  // Hash della password
  const hashedPassword = hash(data.password);

  const newStudent = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: hashedPassword,
    role: "student",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const student = new UserModel(newStudent);
  return student.save();
};


export const logOff = (req: Request, res: Response) => {
  // Rimozione del cookie del token
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  // Risposta al client
  res.status(200).json({ message: 'Log off effettuato con successo.' });
};