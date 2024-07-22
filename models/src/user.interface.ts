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

export interface UserInsertDto{
    name: string,
    surname: string,
    username: string,
    email: string, 
    password: string,
    born: Date,
    country: string,
    city: string,
}

export interface UserGetDto{
    id: number, 
    name: string,
    surname: string,
    username: string,
    email: string, 
    since: Date,
    born: Date,
    comment: string,
    country: string,
    city: string,
    role: string
}