import { z } from 'zod';

import { projectAssignmentSchema } from '@/modules/project-example/assignments';

export const createExampleAssignmentProjectActionSchema = z.object({
  assignment: projectAssignmentSchema,
  teamMemberIds: z.array(z.string())
});

export type CreateExampleAssignmentProjectActionType = z.infer<
  typeof createExampleAssignmentProjectActionSchema
>;
