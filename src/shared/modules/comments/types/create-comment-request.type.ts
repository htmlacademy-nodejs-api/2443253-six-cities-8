import { Request } from 'express';
import { RequestParams, RequestBody } from '../../../../rest/index.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
