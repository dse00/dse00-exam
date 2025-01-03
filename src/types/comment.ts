import { CommentUserType } from "./user";

export type CommentType = CreateCommentType & {
    _id: string;
    user: CommentUserType;
    createdAt: string;
    updatedAt: string;
}


export type CreateCommentType = {
    user: string
    question: string;
    comment: string;
}