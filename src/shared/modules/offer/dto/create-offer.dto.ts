import { mongoose } from '@typegoose/typegoose';
import { City } from '../../../types/city.enum.js';
import { Goods } from '../../../types/index.js';
import { Location } from '../../../types/location.type.js';
import { OfferType } from '../../../types/offer-type.type.js';


export class CreateOfferDto {
  public id: mongoose.Types.ObjectId;
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Goods[];
  public userId: string;
  public commentsCount: number;
  public location: Location;
  // public comments!: string[];
}
