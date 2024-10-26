import { inject, injectable } from 'inversify';
import { Response,Request } from 'express';


import { BaseController, HttpError, HttpMethod } from '../../../rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { ParamOfferId } from '../offer/types/param-offerId-type.js';
import { CreateCommentDto } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/:offerId', method: HttpMethod.Post, handler: this.create,middlewares: [
      new ValidateDtoMiddleware(CreateCommentDto)
    ] });
  }

  public async create(
    { body, params }: Request<ParamOfferId, unknown, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    if (! await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
