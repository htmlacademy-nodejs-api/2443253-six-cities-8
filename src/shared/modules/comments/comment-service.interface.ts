import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity, CreateCommentDto } from './index.js';

export interface CommentService {
  //добавление комментария
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  //выборка всех комментариев
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}

