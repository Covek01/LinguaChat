export interface UserInterface { 
    id: number, 
    name: string,
    surname: string,
    username: string,
    email: string, 
    passHash: string,
    since: Date,
    born: Date,
    comment: string,
    country: string,
    city: string,
    role: string
}