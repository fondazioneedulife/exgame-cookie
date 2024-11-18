import { User } from "../../api-types";

export const getmockLoggedUser = async (): Promise<User> => {
  return {
    _id: "6731d08a364befce3b7bdab2",
    first_name: "Alessandro",
    last_name: "Falezza",
    email: "email@gmail.com",
    password: "hashedPasswoord",
    role: "admin",
    created_at: 1729766635269,
    updated_at: 1729767105639,
    teacher_classes: ["suse", "cookie"],
  } as User;
};
