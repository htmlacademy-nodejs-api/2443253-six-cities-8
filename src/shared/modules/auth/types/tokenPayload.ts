import { TypeUser } from '../../../types/user.type.js';

export type TokenPayload = {
  email: string;
  firstname: string;
  type: TypeUser;
  id: string;
};
