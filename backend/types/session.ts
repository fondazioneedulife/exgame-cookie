import { User } from "../../api-types";

export type SessionUser = Omit<User, "password">;

export type AuthenticatedContext = {
  session: {
    authenticated: boolean;
    user: SessionUser;
  }
}