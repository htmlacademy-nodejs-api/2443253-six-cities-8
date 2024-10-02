export type TypeUser = 'ordinary' | 'pro';

export type User = {
  firstname: string;
  email: string;
  avatarPath: string;
  type:TypeUser;
}
