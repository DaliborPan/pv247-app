import { z } from 'zod';

export const acceptAttendanceCodeSchema = z.enum(['SUCCESS', 'INVALID_TOKEN']);

export type AcceptAttendanceCodeType = z.infer<
  typeof acceptAttendanceCodeSchema
>;
