import { LanguageInterface } from "./language.interface";
export declare class Language implements LanguageInterface {
    id: number;
    name: string;
    popularity: number;
    constructor(id: number, name: string, popularity: number);
}
