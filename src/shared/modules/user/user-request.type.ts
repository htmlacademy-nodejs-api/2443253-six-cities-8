import { Request } from 'express';


import { CreateUserDto } from './dto/create-user.dto.js';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { LoginUserDto } from './index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
