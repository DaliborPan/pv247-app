import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'lector']);
export type UserRoleType = z.infer<typeof userRoleSchema>;
