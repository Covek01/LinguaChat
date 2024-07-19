import { LanguageInterface } from "./language.interface";

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
