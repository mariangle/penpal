export interface IUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    coverPhoto?: string | null;
    about?: string;
    interests: string[];
    country: string;
    dob: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    lastLoggedIn?: Date | null;

    receivedReviews?: IReview[];
}

export interface ILetter {
    id: string;
    receiverId: string;
    senderId: string;
    content: string;
    image?: string;
    createdAt: Date;
    arrivalAt: Date;

    sender: IUser;
    receiver: IUser;
}
  
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

export interface IReply {
    id: string;
    content: string;
    createdAt: Date;
    reviewId: string;

    review: IReview;
}