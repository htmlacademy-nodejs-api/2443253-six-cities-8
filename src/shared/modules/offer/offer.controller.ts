import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';


import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../../rest/index.js';
import { OfferRdo, OfferService } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';
import { CreateOfferRequest } from './create-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }


  public async index(_req: Request, res: Response): Promise<void> {
    // Код обработчика
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(body);
      const existOffer = await this.offerService.exists(body.id);

      if (existOffer) {
        throw new HttpError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          `Предложение с id: «${body.id}» уже существует.`,
          'OfferController');
      }

      const result = await this.offerService.create(body);
      this.created(res, fillDTO(OfferRdo, result));
    } catch (error) {
      return next(error);
    }

  }
}
