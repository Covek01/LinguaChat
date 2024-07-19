import { PostInterface } from "./post.interface";

export class Post implements PostInterface {
    id: number;
    type: string;

    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
    }
}
