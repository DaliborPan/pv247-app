import { type ProjectType } from '@/modules/project/types';

export const getProjectStatusLabel = (
  project: Pick<ProjectType, 'status'> | undefined | null
) => {
  if (!project) return 'No project';

  if (project.status === 'COMPLETED') return 'Completed';
  if (project.status === 'APPROVED') return 'Approved';
  if (project.status === 'CREATED') return 'Created';
  if (project.status === 'FAILED') return 'Failed';

  return 'Unknown';
};
