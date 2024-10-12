import { User } from './user.type.js';

export type Review = {
  id?:string;
  date: string;
  offerId?: string;
  user: User;
  comment: string;
  rating: number;
}
