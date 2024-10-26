import { City } from '../../../types/index.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type ParamCity = {
  city: City;
} | ParamsDictionary;
