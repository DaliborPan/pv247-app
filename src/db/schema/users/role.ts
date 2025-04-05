import { z } from 'zod';

export const dbRoleSchema = z.enum(['student', 'lector']);
