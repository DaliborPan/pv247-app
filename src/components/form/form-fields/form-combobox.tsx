import { useFormContext } from 'react-hook-form';
import { ChevronsUpDown } from 'lucide-react';

import { Combobox, type ComboboxProps } from '@/components/base/combobox';
import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form';

type FormComboboxProps = Omit<ComboboxProps, 'onSelect' | 'value'> & {
  name: string;
  label?: string;
  description?: string;
};

export const FormCombobox = ({
  name,
  label,
  options,
  description,
  triggerButtonProps,
  TriggerIcon = ChevronsUpDown,
  ...comboboxProps
}: FormComboboxProps) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Combobox
            {...comboboxProps}
            value={field.value}
            onSelect={currentValue => {
              field.onChange(currentValue);
            }}
            options={options}
            trigger={
              <FormControl>
                <Button
                  variant="outline"
                  {...triggerButtonProps}
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground',
                    triggerButtonProps?.className
                  )}
                >
                  {field.value
                    ? options.find(option => option.value === field.value)
                        ?.label
                    : 'Select language'}
                  <TriggerIcon className="ml-2 opacity-50 size-4 shrink-0" />
                </Button>
              </FormControl>
            }
          />

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
