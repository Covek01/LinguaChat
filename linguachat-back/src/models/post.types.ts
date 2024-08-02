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

