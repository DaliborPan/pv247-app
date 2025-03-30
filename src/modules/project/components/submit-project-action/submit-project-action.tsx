'use client';

import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { type Project } from '@/db';
import { Button } from '@/components/base/button';

import { submitProjectAction } from './action';

export const useSubmitProjectMutation = (projectId: string) =>
  useMutation({
    mutationFn: async () => submitProjectAction({ projectId })
  });

export const SubmitProjectAction = ({ project }: { project: Project }) => {
  const mutation = useSubmitProjectMutation(project.id);

  return (
    <Button
      disabled={project.status === 'submitted'}
      isLoading={mutation.isPending}
      size="sm"
      iconLeft={{ icon: <Check /> }}
      onClick={async () => {
        const [_, error] = await mutation.mutateAsync();

        if (error) {
          toast.error('Failed to submit project');
          return;
        }

        toast.success('Project submitted!');
      }}
    >
      {project.status === 'submitted' ? 'Submitted' : 'Submit project'}
    </Button>
  );
};
