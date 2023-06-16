export interface  IUser {
    id: string;
    name: string;
    email: string;
    image: string;
    about: string;
    interests: string[];
    country: string;
    dob: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  