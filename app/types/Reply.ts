import { IReview } from "./Review";

export interface IReply {
    id: string;
    content: string;
    createdAt: Date;
    reviewId: string;

    review: IReview;
}