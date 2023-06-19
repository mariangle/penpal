import { IUser } from "./User";

export interface ILetter {
    id: string;
    receiverId: string;
    senderId: string;
    sender: IUser;
    content: string;
    image?: string;
    createdAt: Date;
    arrivalAt: Date;
}