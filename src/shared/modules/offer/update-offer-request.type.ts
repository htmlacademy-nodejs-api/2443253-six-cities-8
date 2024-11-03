import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamOfferId } from './types/param-offerId-type.js';

export type UpdateOfferRequest = Request<ParamOfferId,RequestBody,RequestParams, UpdateOfferDto>;
