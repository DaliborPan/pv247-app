'use client';

import { type DefaultValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import { use } from 'react';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields/form-input';
import { Button } from '@/components/base/button';

import { editProfileFormSchema, type EditProfileFormType } from './schema';
import { editProfileAction } from './action';

export const EditProfileAction = ({
  defaultValuesPromise
}: {
  defaultValuesPromise: Promise<DefaultValues<EditProfileFormType>>;
}) => {
  const defaultValues = use(defaultValuesPromise);

  return (
    <Prompt<EditProfileFormType>
      title="Edit profile"
      formSchema={editProfileFormSchema}
      defaultValues={defaultValues}
      content={
        <div className="flex flex-col gap-y-3 pt-2">
          <FormInput name="firstName" label="First name" />
          <FormInput name="lastName" label="Last name" />
          <FormInput name="github" label="Github nick" />
        </div>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) return;

        const [_, error] = await editProfileAction(data);

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Profile updated successfully!');
      }}
    >
      <Button size="sm" variant="outline" iconLeft={{ icon: <Pencil /> }} />
    </Prompt>
  );
};
