export enum TypeUser {
  ordinary='ordinary',
  pro = 'pro'
}

export type User = {
  firstname: string;
  email: string;
  avatarPath: string;
  type:TypeUser;
}
