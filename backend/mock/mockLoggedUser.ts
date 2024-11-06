import { Role, User } from "../../api-types";

export const getmockLoggedUser = (): User => {
  return {
    _id: "1231241241242342sfdfsd1213",
    first_name: "Alessandro",
    last_name: "Falezza",
    email: "email@gmail.com",
    password: "hashedPasswoord",
    role: "teacher",
    created_at: 1729766635269,
    updated_at: 1729767105639,
    classes: ["suse", "cookie"],
  } as User;
};

export const isAdmin = (): boolean => {
  if (getmockLoggedUser().role == "admin") {
    return true;
  }
  return false;
};

export const isTeacher = (): boolean => {
  const role = getmockLoggedUser().role;
  if (role == "teacher") {
    return true;
  }
  return false;
};

export const isAdminOrTeacher = (): boolean => {
  if (
    getmockLoggedUser().role == "admin" ||
    getmockLoggedUser().role == "teacher"
  ) {
    return true;
  }
  return false;
};

export const isStudent = (): boolean => {
  const role = getmockLoggedUser().role;
  if (role == "student") {
    return true;
  }
  return false;
};