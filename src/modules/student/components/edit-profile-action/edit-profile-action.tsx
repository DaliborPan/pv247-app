'use client';

import { Pencil } from 'lucide-react';
import { use } from 'react';
import { type DefaultValues } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { FieldGroup } from '@/components/base/field/field';
import { Prompt } from '@/components/base/prompt/prompt';
import { FormInput } from '@/components/form/form-fields/form-input';

import { editProfileAction } from '../../actions';
import { profileFormSchema, type ProfileFormType } from '../../schema';

export const EditProfileAction = ({
  defaultValuesPromise
}: {
  defaultValuesPromise: Promise<DefaultValues<ProfileFormType>>;
}) => {
  const defaultValues = use(defaultValuesPromise);

  return (
    <Prompt<ProfileFormType>
      title="Edit profile"
      formSchema={profileFormSchema}
      defaultValues={defaultValues}
      content={
        <FieldGroup className="pt-2">
          <FormInput name="firstName" label="First name" />
          <FormInput name="lastName" label="Last name" />
          <FormInput name="github" label="Github nick" />
        </FieldGroup>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) return;

        const [, error] = await editProfileAction(data);

        if (error) throw new Error(error.message);

        toast.success('Profile updated successfully!');
      }}
    >
      <Button size="sm" variant="outline" iconLeft={{ icon: <Pencil /> }} />
    </Prompt>
  );
};
