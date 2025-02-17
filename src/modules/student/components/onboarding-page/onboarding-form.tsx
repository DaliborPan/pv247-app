'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Form } from '@/components/form';
import { FormInput } from '@/components/form/form-fields/form-input';
import { Button } from '@/components/base/button';

import { onboardingFormSchema, type OnboardingFormSchema } from './schema';
import { onboardingFormAction } from './action';

const useOnboardingFormMutation = () =>
  useMutation({
    mutationFn: async (data: OnboardingFormSchema) => {
      await onboardingFormAction(data);
    }
  });

export const OnboardingForm = ({ userId }: { userId: string }) => {
  const form = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      id: userId
    }
  });

  const mutation = useOnboardingFormMutation();

  const onSubmit = (data: OnboardingFormSchema) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg flex md:block flex-col w-full items-center"
      >
        <h2 className="md:text-3xl text-2xl mb-8">Fill in basic information</h2>

        <div className="flex flex-col gap-y-4 mb-6">
          <FormInput name="firstName" label="First name" />
          <FormInput name="lastName" label="Last name" />
          <FormInput
            name="github"
            label="Github nick"
            description={
              <div className="text-xs md:text-sm">
                <span>If your github URL is </span>
                <span className="text-primary md:text-sm">
                  https://github.com/DaliborPan,{' '}
                </span>
                <span>then fill in </span>
                <span className="font-medium text-black">DaliborPan</span>
              </div>
            }
          />
        </div>

        <div className="flex justify-end w-full md:w-auto">
          <Button
            isLoading={form.formState.isSubmitSuccessful}
            type="submit"
            className="md:w-auto w-full"
          >
            Continue to the application
          </Button>
        </div>
      </form>
    </Form>
  );
};
