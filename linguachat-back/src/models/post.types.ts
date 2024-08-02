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
}


export class PostGetDto implements PostInterface {
    id: number;
    text: string;
    type: string;
    creator: UserInterface;
    language: LanguageInterface;
}

export const NullPost : PostGetDto = {
    id : 0,
    text : '',
    type : '',
    creator : null,
    language : null
}


export class PostInsertDto {
    text: string;
    type: string;
    creatorId: number;
    languageId: number;
}
