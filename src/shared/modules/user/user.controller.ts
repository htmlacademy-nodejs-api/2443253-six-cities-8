import { inject, injectable } from 'inversify';
import { Response } from 'express';


import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../../rest/index.js';
import { CreateUserRequest, LoginUserRequest } from './user-request.type.js';
import { Config } from 'convict';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { UserRdo } from './rdo/user.rdo.js';
import { UserService } from './user-service.interface.js';


@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,

  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Пользователь с таким email: «${body.email}» уже существует.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `Пользователь с таким email: ${body.email} не найден`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
