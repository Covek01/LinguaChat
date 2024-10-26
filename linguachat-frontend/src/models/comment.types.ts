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

    constructor(id: number, text: string, postRelatedTo: PostInterface, userCommented: UserInterface) {
        this.id = id;
        this.text = text;
        this.postRelatedTo = postRelatedTo;
        this.userCommented = userCommented;
    }
}

export class CommentInsertDto {
    text: string;
    postRelatedToId: number;
    userCommentedId: number;

    constructor(text: string, postRelatedToId: number, userCommentedId: number) {
        this.text = text;
        this.postRelatedToId = postRelatedToId;
        this.userCommentedId = userCommentedId;
    }
}
export const NullComment = {
    id: 0,
    text: '',
    postRelatedTo: null,
    userCommented: null
}