'use client';

import { Suspense, use } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { FieldGroup } from '@/components/base/field/field';
import { Prompt } from '@/components/base/prompt/prompt';
import { type ProjectAssignment } from '@/modules/project-example/assignments';
import { type ProjectStudentOptionType } from '@/modules/project/types';
import { type SessionUserType } from '@/modules/session-user/types';

import { StudentCombobox } from '../project-form/student-combobox';
import { createExampleAssignmentProjectAction } from './action';
import { createExampleAssignmentProjectActionSchema } from './schema';

function Fields({
  userOptionsPromise,
  sessionUser
}: {
  userOptionsPromise: Promise<ProjectStudentOptionType[]>;
  sessionUser: SessionUserType;
}) {
  const options = use(userOptionsPromise);

  return (
    <FieldGroup>
      <StudentCombobox options={options} sessionUser={sessionUser} />
    </FieldGroup>
  );
}

export const CreateExampleAssignmentProjectAction = ({
  assignment,
  title,
  userOptionsPromise,
  sessionUser
}: {
  assignment: ProjectAssignment;
  title: string;
  userOptionsPromise: Promise<ProjectStudentOptionType[]>;
  sessionUser: SessionUserType;
}) => (
  <Prompt
    title={title}
    subtitle="Choose your team. The assignment and team members cannot be changed after creation."
    dialogProps={{ size: 'xl' }}
    formSchema={createExampleAssignmentProjectActionSchema}
    defaultValues={{ assignment, teamMemberIds: [] }}
    content={
      <Suspense fallback={<p role="status">Loading team members…</p>}>
        <Fields
          userOptionsPromise={userOptionsPromise}
          sessionUser={sessionUser}
        />
      </Suspense>
    }
    onDecision={async ({ confirmed, data }) => {
      if (!confirmed) return;

      const [, error] = await createExampleAssignmentProjectAction(data);

      if (error) throw new Error(error.message);

      toast.success('Project created.');
    }}
  >
    <Button type="button">Choose this assignment</Button>
  </Prompt>
);
