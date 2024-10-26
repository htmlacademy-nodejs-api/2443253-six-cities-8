import { NextFunction, Request, Response } from 'express';
import { HttpError, Middleware } from '../index.js';

import { StatusCodes } from 'http-status-codes';
import { City } from '../../shared/types/index.js';

export class ValidateCityMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const city = params[this.param];

    if (city in City) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${city} is invalid city`,
      'ValidateCityMiddleware'
    );
  }
}
