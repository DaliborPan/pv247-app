'use client';

import { useFormContext } from 'react-hook-form';

import { Textarea, type TextareaProps } from '@/components/base/textarea';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '../form';

export type FormTextareaProps = TextareaProps & {
  name: string;
  label?: string;
  description?: string;
};

export const FormTextarea = ({
  name,
  description,
  label,
  ...textareaProps
}: FormTextareaProps) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea {...field} {...textareaProps} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
