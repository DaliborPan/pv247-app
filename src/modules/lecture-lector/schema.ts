import { z } from 'zod';

import { dbLectureLectorStatusSchema } from '@/db/schema/lecture-lector-status';

export const lectureLectorStatusSchema = dbLectureLectorStatusSchema;
export type LectureLectorStatusType = z.infer<typeof lectureLectorStatusSchema>;

export const lectureLectorStatusOptions: {
  value: LectureLectorStatusType;
  label: string;
}[] = [
  { value: 'WANT_TO_TEACH', label: 'Chci ucit' },
  { value: 'CAN_TEACH', label: 'Muzu ucit' },
  { value: 'RATHER_NOT_TO_TEACH', label: 'Spis nechci ucit' },
  { value: 'CANNOT_TEACH', label: 'Nemuzu ucit' }
];
