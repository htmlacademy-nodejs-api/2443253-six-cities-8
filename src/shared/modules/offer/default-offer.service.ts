import { inject, injectable } from 'inversify';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { City, Component,SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { MAX_COMMENTS_COUNT } from '../comments/comment.constant.js';
import { MAX_PREMIUN_COUNT } from './offer.constant.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,

  ) {}

  //2.1.Создание нового предложения.
  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое предложение создано: ${dto.title}`);
    return result;
  }

  //2.3.Удаление предложения.
  public async deleteById(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  //2.2.Редактирование предложения.
  public async updateById(offerId: mongoose.Types.ObjectId, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId', 'comments'])
      .exec();
  }

  //2.5.Получение детальной информации о предложении,
  //2.6. Получение списка комментариев для предложения.
  public async findByOfferId(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).
      populate(['userId','comments']).
      exec();
  }

  //Проверка существования предложения.
  public async exists(documentId: mongoose.Types.ObjectId): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: new mongoose.Types.ObjectId(documentId)})) !== null;
  }

  //Увеличивает количество комментариев для предложения.
  public async incCommentCount(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  //2.4.Получение списка предложений по аренде.
  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$offerId', '$offerId'] } } },
              { $project: { _id: 1}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, commentCount: { $size: '$comments'}}
        },
        { $unset: 'comments' },
        { $limit: MAX_COMMENTS_COUNT },
        { $sort: { commentCount: SortType.Down } }//Сортировка по количеству комментариев.
      ]).exec();
  }

  //2.12.Получение списка премиальных предложений для города.
  public async findPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ isPremium: true, city: city })
      .limit(MAX_PREMIUN_COUNT)
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();

  }

  //2.13. Получения списка предложений, добавленных в избранное.
  public async findFavoriteOffers(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ isFavorite: true })
      .populate(['userId'])
      .exec();
  }

  //2.14. Добавление/удаление предложения в/из избранное.
  public async updateFavoriteStatusByOfferId(offerId: mongoose.Types.ObjectId, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: dto.isFavorite}, {new: true})
      .populate(['userId'])
      .exec();
  }


}
