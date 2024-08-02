import { PostInterface } from "./post.types";
import { UserInterface } from "./user.types";

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


export class CommentGetDto implements CommentInterface {
    id: number;
    text: string;
    postRelatedTo: PostInterface;
    userCommented: UserInterface;
}

export class CommentInsertDto {
    text: string;
    postRelatedToId: number;
    userCommentedId: number;
}
export const NullComment = {
    id: 0,
    text: '',
    postRelatedTo: null,
    userCommented: null
}