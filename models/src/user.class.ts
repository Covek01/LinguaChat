import { UserInterface } from "./user.interface";

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
