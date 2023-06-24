import { User, Letter, Review, Reply } from "@prisma/client"

export interface IUser extends Omit<User, "receivedReviews"> {
    receivedReviews: (IReview & { author: IUser })[];
  }
  
  export interface IReview extends Review {
    author: IUser;
  }