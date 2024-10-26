import { LanguageInterface } from "./language.types";
import { UserInterface } from "./user.types";

//Post
export interface PostInterface {
    id: number,
    text: string,
    type: string
}


export class Post implements PostInterface {
    id: number;
    type: string;
    text: string;

    constructor(id: number, text: string, type: string) {
        this.id = id;
        this.text = text;
        this.type = type;
    }
}

export class PostUpdateDto implements PostInterface {
    id: number;
    text: string;
    type: string;
    languageId: number;

    constructor(id: number, text: string, type: string, languageId: number) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.languageId = languageId;
    }
}

export class PostGetDto implements PostInterface {
    id: number;
    text: string;
    type: string;
    createdBy: UserInterface | null;
    language: LanguageInterface | null;

    constructor(id: number, text: string, type: string, createdBy: UserInterface, language: LanguageInterface) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.createdBy = createdBy;
        this.language = language;
    }
}


export const NullPost : PostGetDto = {
    id : 0,
    text : '',
    type : '',
    createdBy : null,
    language : null
}


export class PostInsertDto {
    text: string;
    type: string;
    creatorId: number;
    languageId: number;

    constructor(text: string, type: string, creatorId: number, languageId: number) {
        this.text = text;
        this.type = type;
        this.creatorId = creatorId;
        this.languageId = languageId;
    }
}
