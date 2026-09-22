'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { Form } from '@/components/form/form';
import { FormInput } from '@/components/form/form-fields/form-input';

import { onboardingFormAction } from '../../actions';
import { profileFormSchema, type ProfileFormType } from '../../schema';

const useOnboardingFormMutation = () =>
  useMutation({
    mutationFn: async (data: ProfileFormType) =>
      await onboardingFormAction(data)
  });

export const OnboardingForm = ({
  defaultGithub
}: {
  defaultGithub: string;
}) => {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      github: defaultGithub
    }
  });

  const mutation = useOnboardingFormMutation();

  const onSubmit = async (data: ProfileFormType) => {
    const [_, error] = await mutation.mutateAsync(data);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('You have successfully filled in your information');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center rounded-lg bg-white p-8 lg:block"
      >
        <h2 className="mb-8 text-2xl lg:text-3xl">Fill in basic information</h2>

        <div className="mb-6 flex flex-col gap-y-4">
          <FormInput name="firstName" label="First name" />
          <FormInput name="lastName" label="Last name" />
          <FormInput
            name="github"
            label="Github nick"
            description={
              <div className="text-xs md:text-sm">
                <span>If your github URL is </span>
                <span className="text-primary md:text-sm">
                  github.com/DaliborPan,{' '}
                </span>
                <span>then fill in </span>
                <span className="font-medium text-black">DaliborPan</span>
              </div>
            }
          />
        </div>

        <div className="flex w-full justify-end md:w-auto">
          <Button
            isLoading={mutation.isPending}
            type="submit"
            className="w-full lg:w-auto"
          >
            Continue to the application
          </Button>
        </div>
      </form>
    </Form>
  );
};
