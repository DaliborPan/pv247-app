import { z } from 'zod';

import { dbLectureLectorStatusSchema } from '@/db/schema/lecture-lector-status';

export const lectureLectorStatusSchema = dbLectureLectorStatusSchema;
export type LectureLectorStatusType = z.infer<typeof lectureLectorStatusSchema>;

export const lectureLectorStatusOptions: {
  value: LectureLectorStatusType;
  label: string;
}[] = [
  { value: 'WANT_TO_TEACH', label: 'I want to teach' },
  { value: 'CAN_TEACH', label: 'I can teach' },
  { value: 'RATHER_NOT_TO_TEACH', label: "I'd rather not teach" },
  { value: 'CANNOT_TEACH', label: 'I cannot teach' }
];
