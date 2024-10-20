import { mongoose } from '@typegoose/typegoose';

export class CreateCommentDto {
  public comment: string;
  public offerId: mongoose.Types.ObjectId;
  public rating: number;
  public userId: string;
}
