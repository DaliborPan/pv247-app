import { type auth } from '@/auth';
import { type UserRoleType } from '@/modules/user/schema';

// export type SessionUserType = UserType;
export type SessionUserType = (typeof auth.$Infer.Session)['user'];

export type SessionUserLectorType = Omit<SessionUserType, 'role'> & {
  role: Extract<UserRoleType, 'lector'>;
};
