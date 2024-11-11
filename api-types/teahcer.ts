export type Teacher = {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    courses?: string[];
    image?: string;
};