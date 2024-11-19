'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '../form';
import {
  RichTextEditor,
  type RichTextEditorProps
} from '../../base/rich-text-editor/';

export type FormEditorProps = Omit<
  RichTextEditorProps,
  'value' | 'onChange'
> & {
  name: string;
  label: string;
};

export const FormEditor = ({ name, label, ...props }: FormEditorProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { defaultValues } }) => (
        <FormItem>
          {label && <FormLabel className="pb-1.5">{label}</FormLabel>}

          <FormControl>
            <RichTextEditor
              {...props}
              value={field.value}
              onChange={field.onChange}
              // Make sure we re-render the editor when the default value changes
              key={defaultValues?.[name] ?? ''}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
