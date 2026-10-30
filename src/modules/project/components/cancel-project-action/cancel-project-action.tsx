'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { AlertDialog } from '@/components/base/alert-dialog/alert-dialog';
import { Button } from '@/components/base/button/button';

import { cancelProjectAction } from './action';

const useCancelProjectMutation = () =>
  useMutation({
    mutationFn: async () => {
      const [_, error] = await cancelProjectAction();
      if (error) throw error;
    },
    onError: error => {
      toast.error(error.message);
    }
  });

export const CancelProjectAction = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const mutation = useCancelProjectMutation();

  return (
    <AlertDialog
      open={open}
      onOpenChange={value => {
        if (!mutation.isPending) setOpen(value);
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button type="button" variant="outline/destructive" size="sm">
          Cancel project
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Cancel {name}?</AlertDialog.Title>
          <AlertDialog.Description>
            This permanently deletes the project and dissolves the entire team.
            All members will be without a project and can join a new team. This
            cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
            >
              Keep project
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={mutation.isPending}
              onClick={async e => {
                e.preventDefault();

                await mutation.mutateAsync();
                toast.success(
                  'Project cancelled. All team members are now free.'
                );

                setOpen(false);
                router.replace('/project');
              }}
            >
              {mutation.isPending
                ? 'Cancelling…'
                : 'Permanently cancel project'}
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
