import {DocumentType} from '@typegoose/typegoose';

import { CreateOfferDto, OfferEntity } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
