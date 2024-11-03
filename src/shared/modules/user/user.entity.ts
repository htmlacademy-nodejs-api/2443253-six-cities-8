import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { TypeUser } from '../../types/user.type.js';
import { createSHA256 } from '../../helpers/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({required: false})
  public avatarPath: string;

  @prop({ required: true, default: '' })
  public firstname: string;

  @prop({ required: true, default: '' })
  private password?: string;

  @prop({ required: true, default: '' })
  public type: TypeUser;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
