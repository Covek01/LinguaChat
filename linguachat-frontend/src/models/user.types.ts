//User

import { count } from "rxjs";



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



export class UserInsertDto{

    name: string;

    surname: string;

    username: string;

    email: string;

    password: string;

    born: Date;
    
    country: string;

    city: string;


    constructor(
        name: string = '',
        surname: string = '', 
        username: string = '', 
        email: string = '', 
        password: string = '', 
        born: Date = new Date(), 
        country: string = '', 
        city: string = ''
    ) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.born = born;
        this.country = country;
        this.city = city;
    }
}

export class UserInsertDtoWithPasswordReset extends UserInsertDto {
    confirmPassword: string;

    constructor(
        name: string = '',
        surname: string = '', 
        username: string = '', 
        email: string = '', 
        password: string = '', 
        born: Date = new Date(), 
        country: string = '', 
        city: string = '',
        confirmPassword = ''
    ) {
        super(name, surname, username, email, password, born, country, city);
        this.confirmPassword = confirmPassword;
    }
}

export interface UserGetDtoInterface{
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

export interface UserGetDto{
    id: number;

    name: string;

    surname: string;

    username: string;

    email: string;

    since: Date;

    born: Date;

    comment: string;

    country: string;

    city: string;

    role: string;
}

export class User implements UserInterface {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    passHash: string;
    since: Date;
    born: Date;
    comment: string;
    country: string;
    city: string;
    role: string;

    constructor(
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
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.passHash = passHash;
        this.since = since;
        this.born = born;
        this.comment = comment;
        this.country = country;
        this.city = city;
        this.role = role;
    }
}

export interface SignInDto{
    username: string;
    password: string
}

