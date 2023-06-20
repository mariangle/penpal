export type Interests = "Music" | "Outdoors" | "Fitness";

// to be added in the future

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface  IUser {
    id: string;
    name: string;
    email: string;
    image: string;
    coverPhoto: string;
    about: string;
    interests: Interests[]; // to be seperated in own table
    country: string;
    dob: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;
    
    // Gender: Gender
  }
  