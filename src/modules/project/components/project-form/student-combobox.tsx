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
    <div className="flex items-center p-4 bg-white rounded-lg">
      <div className="flex items-center grow gap-x-3">
        <div className="rounded-full size-10 bg-background" />

        <div className="flex flex-col">
          <span className="text-sm">{studentOption.label}</span>
          <span className="-mt-px text-gray-600 text-xxs">Web developer</span>
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
          <FormLabel className="text-xl grow">Students</FormLabel>

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
        <div className="flex flex-col gap-y-2 mt-4">
          {students.map(s => (
            <StudentSelectedComboboxItem
              key={s}
              studentOption={options.find(opt => opt.value === s)!}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-4 mt-4 text-gray-400 bg-white rounded-lg">
          No students added yet.
        </div>
      )}
    </div>
  );
};
