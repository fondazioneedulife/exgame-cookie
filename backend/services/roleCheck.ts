import { getmockLoggedUser } from "../mock/mockLoggedUser";

export const isAdmin = async (): Promise<boolean> => {
  const user = await getmockLoggedUser();
  if (user.role == "admin") {
    return true;
  }
  return false;
};

export const isTeacher = async (): Promise<boolean> => {
  const user = await getmockLoggedUser();
  if (user.role == "teacher") {
    return true;
  }
  return false;
};

export const isAdminOrTeacher = async (): Promise<boolean> => {
  const user = await getmockLoggedUser();
  if (user.role == "admin" || user.role == "teacher") {
    return true;
  }
  return false;
};

export const isStudent = async (): Promise<boolean> => {
  const user = await getmockLoggedUser();
  if (user.role == "student") {
    return true;
  }
  return false;
};
