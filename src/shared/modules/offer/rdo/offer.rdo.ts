import { Expose, Type } from 'class-transformer';
import { City, Goods, Location, OfferType } from '../../../types/index.js';

import { Ref } from '@typegoose/typegoose';

import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {

  @Expose()
  public id: string;

   @Expose()
  public title: string;

  @Expose()
   public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: Goods[];

  @Expose()
  @Type(()=> UserRdo)
  public userId: Ref<UserRdo>;

  // @Expose()
  // @Type(()=> CommentRdo)
  // public comments: Ref<CommentRdo>[];

  // @prop({
  //   ref: CommentEntity,
  //   required: true,
  //   default:[],
  //   _id: false
  // })
  // public comments?: Ref<CommentEntity>[];

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Location;
}
