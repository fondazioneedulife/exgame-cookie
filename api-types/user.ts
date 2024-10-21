export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  courses?: string[];
  image?: string;
};
