'use client';

import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields/form-input';
import { FormTextarea } from '@/components/form/form-fields/form-textarea';

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
      dialogProps={{ size: '2xl' }}
      title="Set points"
      formSchema={setProjectPointsFormSchema}
      defaultValues={{
        ...defaultValues,
        projectId
      }}
      content={
        <div className="flex flex-col gap-y-4 pt-2">
          <FormInput type="number" name="points" label="Points" />
          <FormTextarea name="comment" label="Comment" />
        </div>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) return;

        const [_, error] = await mutation.mutateAsync(data);

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Project points updated!');
      }}
    >
      {children}
    </Prompt>
  );
};
