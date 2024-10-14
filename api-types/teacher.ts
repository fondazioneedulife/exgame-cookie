export type Teacher = {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    courses?: string[];
    image?: string;
}