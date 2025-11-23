import { z } from 'zod';

/**
 * Special case of importing schemas from database, because we want
 * to have enums in database directly.
 *
 * Reexporting them from this file to allow other components/... to import from here
 */
import { dbRoleSchema } from '@/db/schema/users/role';

export const userRoleSchema = dbRoleSchema;
export type UserRoleType = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.string().nullish(),
  role: userRoleSchema,
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  github: z.string().nullable(),
  lectorId: z.string().nullable(),
  projectId: z.string().nullable()
});

export type UserType = z.infer<typeof userSchema>;
