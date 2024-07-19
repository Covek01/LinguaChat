import { PostInterface } from "./post.interface";
export declare class Post implements PostInterface {
    id: number;
    type: string;
    constructor(id: number, type: string);
}
