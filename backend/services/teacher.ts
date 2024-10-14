import { Teacher } from "api-types";

const DB: Teacher[] = [];

export const index = async (): Promise<Teacher[]> => {
  return DB;
};

export const view = async (id: string): Promise<Teacher | null> => {
  return DB.find((teacher) => teacher._id === id) || null;
};

export const add = async (teacher: Teacher): Promise<void> => {
  DB.push(teacher);
};

export const edit = async (
  id: string,
  teacher: Teacher,
): Promise<Teacher | null> => {
  const index = DB.findIndex((teacher) => teacher._id === id);
  if (index === -1) {
    return null;
  }
  DB[index] = teacher;
  return teacher;
};

export const remove = async (id: string): Promise<void> => {
  const index = DB.findIndex((teacher) => teacher._id === id);
  if (index !== -1) {
    DB.splice(index, 1);
  }
};
