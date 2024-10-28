import { inject, injectable } from 'inversify';
import { Response} from 'express';


import { BaseController, HttpMethod } from '../../../rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './index.js';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create,middlewares: [
      new PrivateRouteMiddleware(),
      new ValidateDtoMiddleware(CreateCommentDto),
    ] });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const { offerId } = body;
    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
