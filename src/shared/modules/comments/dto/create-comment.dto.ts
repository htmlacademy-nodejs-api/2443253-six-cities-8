import { IsMongoId, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';


export class CreateCommentDto {

  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public comment: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsNumber({},{ message: CreateCommentMessages.rating.invalidFormat })
  @MinLength(1, { message: CreateCommentMessages.rating.minValue })
  @MaxLength(5, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId: string;
}
