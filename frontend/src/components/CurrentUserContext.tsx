import { createContext } from "react";
import { User } from "../../../api-types/user";

export const CurrentUserContext = createContext<User | undefined>(undefined);
