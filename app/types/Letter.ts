import { IUser } from "./User";

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