import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { City, Goods, Location, OfferType} from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public title: string;

  @prop({required: true})
  public description: string;

  @prop({required: true})
  public postDate: Date;

  @prop({required: true,
    enum: City})
  public city!: City;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string;

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: number;

  @prop({required: true})
  public type: OfferType;

  @prop({required: true})
  public bedrooms: number;

  @prop({required: true})
  public maxAdults: number;

  @prop({required: true})
  public price: number;

  @prop({required: true})
  public goods: Goods;

  @prop({
    ref: UserEntity,
    required: true})
  public userId: Ref<UserEntity>;

  @prop({default:0})
  public reviewsCount: number;

  @prop({required: true})
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
