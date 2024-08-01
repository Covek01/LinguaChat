
//Comment
export interface CommentInterface {
    id: number,
    text: string
}

export class Comment implements CommentInterface {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}


//Connection
export interface ConnectionInterface {
    id: number,
    first_id: number,
    second_id: number,
    since: Date
}




//Post
export interface PostInterface {
    id: number,
    type: string
}


export class Post implements PostInterface {
    id: number;
    type: string;

    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
    }
}







