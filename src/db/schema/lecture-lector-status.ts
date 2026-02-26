import { z } from 'zod';

export const dbLectureLectorStatusSchema = z.enum([
  'WANT_TO_TEACH',
  'CAN_TEACH',
  'RATHER_NOT_TO_TEACH',
  'CANNOT_TEACH'
]);
