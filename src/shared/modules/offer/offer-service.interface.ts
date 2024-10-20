import {DocumentType, mongoose} from '@typegoose/typegoose';

import { CreateOfferDto, OfferEntity } from './index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService {
  //2.1.Создание нового предложения.
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  //2.5.Получение детальной информации о предложении,
  //2.6. Получение списка комментариев для предложения.
  findByOfferId(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null>;
  //2.4.Получение списка предложений по аренде.
  find(): Promise<DocumentType<OfferEntity>[]>;
  //2.3.Удаление предложения.
  deleteById(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null>;
  //2.2.Редактирование предложения.
  updateById(offerId: mongoose.Types.ObjectId, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  // findByCategoryId(categoryId: string, count?: number): Promise<DocumentType<OfferEntity>[]>;
  //Увеличение количества комментариев для предложения.
  incCommentCount(offerId: mongoose.Types.ObjectId): Promise<DocumentType<OfferEntity> | null>;
  // findNew(count: number): Promise<DocumentType<OfferEntity>[]>;
  //2.12.Получение списка премиальных предложений для города.
  findPremiumOffersByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  //2.13. Получения списка предложений, добавленных в избранное.
  findFavoriteOffers(): Promise<DocumentType<OfferEntity>[]>;
  //2.14. Добавление/удаление предложения в/из избранное.
  updateFavoriteStatusByOfferId(offerId: mongoose.Types.ObjectId, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: mongoose.Types.ObjectId): Promise<boolean>;
}
