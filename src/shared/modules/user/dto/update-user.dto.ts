import { TypeUser } from '../../../types/user.type.js';

export class UpdateUserDto {
  public avatarPath?: string;
  public firstname?: string;
  public type?: TypeUser;
}
