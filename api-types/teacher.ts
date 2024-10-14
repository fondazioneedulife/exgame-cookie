export type Teacher = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    courses?: string[];                // [] perchè è un array
    image?: string;                    // ? vuol dire che è opzionale, indipendentemente da dove lo metti (qualsiasi dato)
}