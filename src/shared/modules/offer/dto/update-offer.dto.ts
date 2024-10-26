import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, IsObject, IsOptional, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Goods, Location, OfferType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalidFormat })
  public city?: City;

  @IsOptional()
  @IsUrl({}, { message: UpdateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidFormat })
  @IsUrl({},{each:true, message: UpdateOfferValidationMessage.images.invalidId })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({},{ message: UpdateOfferValidationMessage.rating.invalidFormat })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: UpdateOfferValidationMessage.type.invalidFormat })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedRooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.bedRooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedRooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods,{each:true, message: UpdateOfferValidationMessage.userId.invalidId })
  public goods?: Goods[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.userId.invalidId })
  public userId?: string;

  public commentsCount?: number;

  @IsOptional()
  @IsObject({ message: UpdateOfferValidationMessage.location.invalidFormat })
  public location?: Location;

  public comments?: string[];
}
