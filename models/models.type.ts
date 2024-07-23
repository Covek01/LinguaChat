
//Comment
export interface CommentInterface {
    id: number,
    text: string
}

export class Comment implements CommentInterface {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}


//Connection
export interface ConnectionInterface {
    id: number,
    first_id: number,
    second_id: number,
    since: Date
}


//Language
export interface LanguageInterface {
    id: number,
    name: string, 
    popularity: number
}

export class Language  implements LanguageInterface {
    id: number;
    name: string;
    popularity: number;

    constructor(id: number, name: string, popularity: number) {
        this.id = id;
        this.name = name;
        this.popularity = popularity;
    }
}

//Post
export interface PostInterface {
    id: number,
    type: string
}


export class Post implements PostInterface {
    id: number;
    type: string;

    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
    }
}







//User


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
    username: string,
    password: string
}