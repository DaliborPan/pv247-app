'use client';

import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { Button } from '@/components/base/button';
import { Prompt } from '@/components/base/prompt';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/form/form';
import { cn } from '@/lib/cn';

import { signUpLectureAction } from './action';
import {
  lectureLectorStatusOptions,
  lectureLectorStatusSchema
} from '../../schema';

const signUpLectureFormSchema = z.object({
  status: lectureLectorStatusSchema
});

type SignUpLectureFormType = z.infer<typeof signUpLectureFormSchema>;

const useSignUpLectureMutation = (lectureId: string) =>
  useMutation({
    mutationFn: async (input: SignUpLectureFormType) =>
      signUpLectureAction({ lectureId, status: input.status })
  });

export const SignUpLectureAction = ({
  lectureId,
  disabled
}: {
  lectureId: string;
  disabled?: boolean;
}) => {
  const mutation = useSignUpLectureMutation(lectureId);

  return (
    <Prompt<SignUpLectureFormType>
      title="Sign up for lecture"
      formSchema={signUpLectureFormSchema}
      defaultValues={{ status: 'WANT_TO_TEACH' }}
      content={
        <div className="pt-2">
          <FormField
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your availability</FormLabel>

                <div
                  role="radiogroup"
                  aria-label="Teaching availability"
                  className="grid grid-cols-1 gap-2 md:grid-cols-2"
                >
                  {lectureLectorStatusOptions.map(option => {
                    const isSelected = field.value === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => field.onChange(option.value)}
                        className={cn(
                          'border-border-primary bg-bg-primary hover:bg-bg-secondary rounded-md border px-3 py-2 text-left text-sm transition-colors',
                          isSelected &&
                            'border-primary bg-primary-100 font-medium text-primary'
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) return;

        const [_, error] = await mutation.mutateAsync(data);

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Successfully signed up for the lecture.');
      }}
    >
      <Button
        size="sm"
        variant="outline/primary"
        disabled={disabled}
        iconLeft={{ icon: <UserPlus /> }}
      >
        Sign up
      </Button>
    </Prompt>
  );
};
