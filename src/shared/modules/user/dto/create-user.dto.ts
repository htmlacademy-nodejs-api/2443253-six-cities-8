import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { TypeUser } from '../../../types/user.type.js';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath: string;

  @IsString({ message: CreateUserMessages.firstname.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.firstname.lengthField })
  public firstname: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;

  @IsEnum(TypeUser, { message: CreateUserMessages.type.invalidFormat })
  public type: TypeUser;
}
