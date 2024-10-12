import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity, CreateCommentDto } from './index.js';

export interface CommentService {
  //добавление комментария
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  //findByCommentId(commentId: string): Promise<DocumentType<CommentEntity> | null>;
  //выборка всех комментариев
  find(): Promise<DocumentType<CommentEntity>[]>;
}

