import { Request } from 'express';
import { RequestParams } from '../../../rest/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamOfferId } from './types/param-offerId-type.js';

export type DeleteOfferRequest = Request<ParamOfferId,RequestParams, UpdateOfferDto>;
