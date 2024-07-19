import { CommentInterface } from "./comment.interface";

class Comment implements CommentInterface {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}
