import { inject, injectable } from 'inversify';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { DefaultOfferService } from '../offer/default-offer.service.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
     @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
     @inject(Component.OfferService)
     private readonly offerService: DefaultOfferService
  ) {}


  //Средний рейтинг текущего предложения
  async countAverageRating(offerId: mongoose.Types.ObjectId): Promise<number> {
    const [comment] = await this.commentModel.aggregate<Record<string, number>>(
      [
        { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
        { $group: { _id: null, averageRating: { $avg: '$rating' } } },
      ]);
    return +comment.averageRating.toFixed(1);
  }

  //добавление комментария, подсчет и обновление среднего рейтинга текущего предложения
  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    const averageRating = await this.countAverageRating(dto.offerId);
    this.offerService.updateById(dto.offerId, {rating:averageRating});
    return comment.populate('userId');
  }


  //выборка всех комметариев
  public async find(): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find();
  }
}
