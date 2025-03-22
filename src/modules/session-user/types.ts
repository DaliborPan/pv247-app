import { type DefaultSession } from 'next-auth';

import { type User } from '@/db';

export type SessionUserType = DefaultSession['user'] & User;
