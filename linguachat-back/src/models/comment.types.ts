//Comment
export interface CommentInterface {
    id: number,
    text: string
}

export class CommentDto implements CommentInterface {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}
