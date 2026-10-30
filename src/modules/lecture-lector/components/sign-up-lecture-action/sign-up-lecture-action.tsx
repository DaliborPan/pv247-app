'use client';

import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/base/button/button';
import { FieldGroup } from '@/components/base/field/field';
import { Prompt } from '@/components/base/prompt/prompt';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/form/form';
import { cn } from '@/lib/cn';

import {
  lectureLectorStatusOptions,
  lectureLectorStatusSchema
} from '../../schema';
import { signUpLectureAction } from './action';

const signUpLectureFormSchema = z.object({
  status: lectureLectorStatusSchema
});

type SignUpLectureFormType = z.infer<typeof signUpLectureFormSchema>;

export const SignUpLectureAction = ({
  lectureId,
  disabled
}: {
  lectureId: string;
  disabled?: boolean;
}) => (
  <Prompt<SignUpLectureFormType>
    title="Sign up for lecture"
    formSchema={signUpLectureFormSchema}
    defaultValues={{ status: 'WANT_TO_TEACH' }}
    content={
      <FieldGroup className="pt-2">
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
      </FieldGroup>
    }
    onDecision={async ({ confirmed, data }) => {
      if (!confirmed) return;

      const [, error] = await signUpLectureAction({
        lectureId,
        status: data.status
      });

      if (error) throw new Error(error.message);

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
