import { IReview } from "./Review";

// export type Interests = "Music" | "Outdoors" | "Fitness";

// to be added in the future

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}



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
