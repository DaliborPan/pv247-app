'use client';

import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/base/button';
import { type Project } from '@/db';

import { useApproveProjectMutation } from './mutation';

export const ApproveProjectButton = ({ project }: { project: Project }) => {
  const mutation = useApproveProjectMutation();

  const StatusIcon = project.status === 'pending' ? Check : X;

  return (
    <Button
      size="sm"
      variant="primary/inverse"
      iconLeft={{ icon: <StatusIcon /> }}
      onClick={() => {
        mutation.mutate(
          { project },
          {
            onSuccess: () => {
              toast.success('Project approved successfully');
            }
          }
        );
      }}
    >
      {project.status !== 'pending' ? 'Disapprove' : 'Approve'}
    </Button>
  );
};
