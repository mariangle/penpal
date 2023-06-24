import { IUser } from "./User";
import { IReply } from "./Reply";

export interface IReview {
    id: string;
    rating: 1 | 2 | 3 | 4 | 5;
    content: string;
    createdAt: Date;
    userId: string;
    authorId: string;
    author: IUser;
    user: IUser;
    replies: IReply[];
}