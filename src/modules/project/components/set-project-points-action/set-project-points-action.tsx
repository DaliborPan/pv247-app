'use client';

import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';

import { FieldGroup } from '@/components/base/field/field';
import { Prompt } from '@/components/base/prompt/prompt';
import { FormCombobox } from '@/components/form/form-fields/form-combobox';
import { FormTextarea } from '@/components/form/form-fields/form-textarea';

import { setProjectPointsAction } from './action';
import {
  type SetProjectPointsFormSchema,
  setProjectPointsFormSchema
} from './schema';

export const SetProjectPointsAction = ({
  projectId,
  defaultValues,
  children
}: PropsWithChildren<{
  projectId: string;
  defaultValues?: Partial<SetProjectPointsFormSchema>;
}>) => (
  <Prompt<SetProjectPointsFormSchema>
    dialogProps={{ size: '2xl' }}
    title="Set points"
    formSchema={setProjectPointsFormSchema}
    defaultValues={{
      ...defaultValues,
      projectId
    }}
    content={
      <FieldGroup className="pt-2">
        <FormCombobox
          name="status"
          label="Status"
          options={[
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'FAILED', label: 'Failed' }
          ]}
        />
        <FormTextarea name="comment" label="Comment" />
      </FieldGroup>
    }
    onDecision={async ({ confirmed, data }) => {
      if (!confirmed) return;

      const [, error] = await setProjectPointsAction(data);

      if (error) throw new Error(error.message);

      toast.success('Project points updated!');
    }}
  >
    {children}
  </Prompt>
);
