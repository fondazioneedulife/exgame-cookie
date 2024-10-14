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
  updatedTeacher: Partial<Teacher>,
): Promise<Teacher | null> => {
  const document = DB.find((teacher) => teacher._id === id);
  if (!document) {
    throw new Error(`Teacher with id ${id} not found`);
  }

  const updatedDocument = { ...document, ...updatedTeacher };

  DB.forEach((teacher, index) => {
    if (teacher._id === id) {
      DB[index] = updatedDocument;
    }
  });

  return updatedDocument;
};

export const remove = async (id: string): Promise<void> => {
  const index = DB.findIndex((teacher) => teacher._id === id);
  if (index !== -1) {
    DB.splice(index, 1);
  }
};
