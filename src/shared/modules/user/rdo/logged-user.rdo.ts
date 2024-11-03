import { Expose } from 'class-transformer';
import { TypeUser } from '../../../types/user.type.js';

export class LoggedUserRdo {
  // @Expose()
  // public token: string;

  @Expose()
  public email: string;

  @Expose()
  public firstname: string;

  @Expose()
  public type: TypeUser;

  @Expose()
  public avatarPath: string;
}
