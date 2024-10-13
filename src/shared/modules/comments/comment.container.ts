import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { CommentEntity, commentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(commentModel);

  return commentContainer;
}
