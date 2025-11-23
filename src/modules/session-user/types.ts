import { type auth } from '@/auth';
import { type UserRoleType } from '@/modules/user/schema';

export type SessionUserType = Omit<
  (typeof auth.$Infer.Session)['user'],
  'role'
> & {
  role: UserRoleType;
};

export type SessionUserLectorType = Omit<SessionUserType, 'role'> & {
  role: Extract<UserRoleType, 'lector'>;
};
