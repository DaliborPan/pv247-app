'use client';

import { useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

import { Combobox, type ComboboxOption } from '@/components/base/combobox';
import { Button } from '@/components/base/button';
import { FormLabel } from '@/components/form';

import { type ProjectFormSchema } from './schema';

const StudentSelectedComboboxItem = ({
  studentOption
}: {
  studentOption: ComboboxOption;
}) => {
  const formContext = useFormContext<ProjectFormSchema>();

  const students = formContext.watch('students');

  return (
    <div className="flex items-center rounded-lg bg-white p-4">
      <div className="flex grow items-center gap-x-3">
        <div className="size-10 rounded-full bg-background" />

        <div className="flex flex-col">
          <span className="text-sm">{studentOption.label}</span>
          <span className="-mt-px text-xxs text-text-secondary">
            Web developer
          </span>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline/destructive"
        iconLeft={{ icon: <Trash /> }}
        onClick={() => {
          formContext.setValue(
            'students',
            students.filter(s => s !== studentOption.value)
          );
        }}
      />
    </div>
  );
};

export const StudentCombobox = ({ options }: { options: ComboboxOption[] }) => {
  const formContext = useFormContext<ProjectFormSchema>();

  const students = formContext.watch('students');

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          <FormLabel className="grow text-xl">Students</FormLabel>

          <Combobox
            emptyMessage="No options available."
            value=""
            TriggerIcon={Plus}
            trigger={
              <Button
                variant="outline/primary"
                size="sm"
                iconLeft={{ icon: <Plus /> }}
              >
                Add student
              </Button>
            }
            triggerPlaceholder="Add student..."
            options={options.filter(option => !students.includes(option.value))}
            onSelect={currentValue => {
              formContext.setValue('students', [...students, currentValue]);
            }}
          />
        </div>
      </div>

      {students.length > 0 ? (
        <div className="mt-4 flex flex-col gap-y-2">
          {students.map(s => (
            <StudentSelectedComboboxItem
              key={s}
              studentOption={options.find(opt => opt.value === s)!}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center rounded-lg bg-white p-4 text-text-terciary">
          No students added yet.
        </div>
      )}
    </div>
  );
};
