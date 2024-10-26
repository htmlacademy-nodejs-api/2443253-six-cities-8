
import { IsArray, IsUrl, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsObject, IsBoolean, IsNumber } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { Goods } from '../../../types/index.js';
import { Location } from '../../../types/location.type.js';
import { OfferType } from '../../../types/offer-type.type.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: City;

  @IsUrl({}, { message: CreateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @IsUrl({},{each:true, message: CreateOfferValidationMessage.images.invalidId })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite: boolean;

  @IsNumber({},{ message: CreateOfferValidationMessage.rating.invalidFormat })
  @MinLength(1, { message: CreateOfferValidationMessage.rating.minValue })
  @MaxLength(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating: number;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalidFormat })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.bedRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedRooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedRooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods,{each:true, message: CreateOfferValidationMessage.userId.invalidId })
  public goods: Goods[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId: string;

  public commentsCount: number;

  @IsObject({ message: CreateOfferValidationMessage.location.invalidFormat })
  public location: Location;

  public comments: string[];
}
