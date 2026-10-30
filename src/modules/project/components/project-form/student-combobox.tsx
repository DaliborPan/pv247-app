'use client';

import { Plus, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/base/button/button';
import {
  Combobox,
  type ComboboxOption
} from '@/components/base/combobox/combobox';
import { Field } from '@/components/base/field/field';
import { type SessionUserType } from '@/modules/session-user/types';

import { ProjectTeamMembers } from './project-team-members';

export const StudentCombobox = ({
  options,
  sessionUser
}: {
  options: ComboboxOption[];
  sessionUser: SessionUserType;
}) => {
  const {
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useFormContext<{ teamMemberIds: string[] | undefined }>();

  const teamMemberIds = watch('teamMemberIds') ?? [];

  const sessionUserOption = {
    value: sessionUser.id,
    label: `${sessionUser.firstName} ${sessionUser.lastName}`
  };

  const members = [
    sessionUserOption,
    ...teamMemberIds.map(
      id =>
        options.find(option => option.value === id) ?? {
          value: id,
          label: 'Unavailable student — please remove'
        }
    )
  ];

  const error = errors.teamMemberIds?.message;

  return (
    <Field data-invalid={!!error}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">Team members ({members.length}/4)</h2>
        <Combobox
          value=""
          searchPlaceholder="Search students…"
          emptyMessage="No students without a project."
          trigger={
            <Button
              type="button"
              size="sm"
              variant="outline/primary"
              disabled={teamMemberIds.length >= 3 || isSubmitting}
              aria-label="Add teammate"
              aria-invalid={!!error}
              iconLeft={{ icon: <Plus data-icon="inline-start" /> }}
            >
              Add teammate
            </Button>
          }
          options={options.filter(
            option => !teamMemberIds.includes(option.value)
          )}
          onSelect={value => {
            setValue('teamMemberIds', [...teamMemberIds, value]);
          }}
        />
      </div>

      <p className="text-sm text-text-secondary">
        Choose 2–4 members including yourself. Members are added immediately and
        cannot be changed after creation.
      </p>

      <ProjectTeamMembers
        members={members.map(member => ({
          id: member.value,
          name: member.label
        }))}
        currentUserId={sessionUserOption.value}
        renderAction={member =>
          member.id !== sessionUserOption.value && (
            <Button
              type="button"
              size="sm"
              variant="outline/destructive"
              disabled={isSubmitting}
              iconLeft={{ icon: <Trash data-icon="inline-start" /> }}
              onClick={() =>
                setValue(
                  'teamMemberIds',
                  teamMemberIds.filter(id => id !== member.id)
                )
              }
            />
          )
        }
      />

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Field>
  );
};
