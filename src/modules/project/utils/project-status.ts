import { ProjectType } from '../schema';

export const getProjectStatus = (project: ProjectType | undefined | null) => {
  if (!project) return 'No project';
  if (project.status === 'pending') return 'Pending';
  if (project.status === 'approved') return 'Approved';

  return 'Submitted';
};
