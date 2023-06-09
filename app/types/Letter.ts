import { IUser } from "./User";

export interface ILetter {
    id: string;
    receiverId: string;
    senderId: string;
    sender: IUser;
    title: string;
    content: string;
    image?: string;
    createdAt: Date;
}