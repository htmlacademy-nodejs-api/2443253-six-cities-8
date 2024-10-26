import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';


import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../../rest/index.js';
import { CreateOfferDto, OfferRdo, OfferService, PreviewOfferRdo } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';

import { ParamOfferId } from './types/param-offerId-type.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamCity } from './types/param-city-type.js';
import { CommentService } from '../comments/index.js';
import { CommentRdo } from '../comments/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../../rest/middleware/validate-objectId.interface.js';
import { ValidateCityMiddleware } from '../../../rest/middleware/validate-city.interface.js';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]});
    this.addRoute({ path: '/favorite', method: HttpMethod.Get, handler: this.indexFavorite }); //Получить избранные предложения
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.indexPremiumForCity, middlewares: [new ValidateCityMiddleware('city')]}); //Получить премиальные предложения для города
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show, middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete,middlewares: [new ValidateObjectIdMiddleware('offerId')] }); //Удалить предложение
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto),] }); //Обновить предложение
    this.addRoute({ path: '/comments/:offerId', method: HttpMethod.Get, handler: this.getComments,middlewares: [new ValidateObjectIdMiddleware('offerId')] });//Получить список комментариев
  }


  //Запрос всех предложений с сервера
  public async index(_req: Request, res: Response): Promise<void> {
    // Код обработчика
    const offers = await this.offerService.find();
    const responseData = fillDTO(PreviewOfferRdo, offers);
    this.ok(res, responseData);
  }

  //Запрос избранных предложений с сервера
  public async indexFavorite(_req: Request, res: Response): Promise<void> {
    // Код обработчика
    const offers = await this.offerService.findFavoriteOffers();
    const responseData = fillDTO(PreviewOfferRdo, offers);
    this.ok(res, responseData);
  }

  //Запрос премиальных предложений для города с сервера
  public async indexPremiumForCity({params} : Request<ParamCity>,res: Response,): Promise<void> {
    const { city } = params;
    // Код обработчика
    const offers = await this.offerService.findPremiumOffersByCity(city);

    if (! offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Премиальных предложений в городе: ${city} не найдено.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(PreviewOfferRdo, offers);
    this.ok(res, responseData);
  }

  //Показать детальное описание предложения
  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findByOfferId(offerId);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложение с id: ${offerId} не найдено.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  //Создать предложение
  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findByOfferId(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  //изменить предложение
  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  //Удалить предложение
  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    if (!await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  // public async create(
  //   { body }: CreateOfferRequest,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     console.log(body);
  //     const existOffer = await this.offerService.exists(body.id);

  //     if (existOffer) {
  //       throw new HttpError(
  //         StatusCodes.UNPROCESSABLE_ENTITY,
  //         `Предложение с id: «${body.id}» уже существует.`,
  //         'OfferController');
  //     }

  //     const result = await this.offerService.create(body);
  //     this.created(res, fillDTO(OfferRdo, result));
  //   } catch (error) {
  //     return next(error);
  //   }

  // }
}
