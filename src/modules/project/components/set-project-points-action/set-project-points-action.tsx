'use client';

import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields';

import {
  type SetProjectPointsFormSchema,
  setProjectPointsFormSchema
} from './schema';
import { useSetProjectPointsMutation } from './mutation';

export const SetProjectPointsAction = ({
  projectId,
  defaultValues,
  children
}: PropsWithChildren<{
  projectId: string;
  defaultValues?: Partial<SetProjectPointsFormSchema>;
}>) => {
  const mutation = useSetProjectPointsMutation();

  return (
    <Prompt<SetProjectPointsFormSchema>
      title="Set points"
      formSchema={setProjectPointsFormSchema}
      defaultValues={{
        ...defaultValues,
        projectId
      }}
      content={
        <div className="flex flex-col pt-2 gap-y-3">
          <FormInput type="number" name="points" label="Points" />
          <FormInput name="comment" label="Comment" />
        </div>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) return;

        try {
          await mutation.mutateAsync(data);

          toast.success('Project points updated!');
        } catch (error) {
          toast.error('Failed to update project points');
        }
      }}
    >
      {children}
    </Prompt>
  );
};