'use client';

import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/base/button';

import { type ProjectType } from '../../schema';

import { approveProjectAction } from './action';

const useApproveProjectMutation = (project: ProjectType) =>
  useMutation({
    mutationFn: async () =>
      approveProjectAction({
        projectId: project.id,
        currentStatus: project.status
      })
  });

export const ApproveProjectButton = ({ project }: { project: ProjectType }) => {
  const mutation = useApproveProjectMutation(project);

  const StatusIcon = project.status === 'pending' ? Check : X;

  return (
    <Button
      size="sm"
      variant="primary/inverse"
      iconLeft={{ icon: <StatusIcon /> }}
      onClick={async () => {
        const [_, error] = await mutation.mutateAsync();

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Project approved successfully');
      }}
    >
      {project.status !== 'pending' ? 'Disapprove' : 'Approve'}
    </Button>
  );
};
