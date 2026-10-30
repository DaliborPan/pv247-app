import { Suspense } from 'react';

import { Field, FieldGroup } from '@/components/base/field/field';
import { FormEditor } from '@/components/form/form-fields/form-editor';
import { FormInput } from '@/components/form/form-fields/form-input';
import { FormTextarea } from '@/components/form/form-fields/form-textarea';
import { getProjectFormStudentComboboxOptionsQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

import { ProjectFormProvider } from './project-form-provider';
import {
  ProjectTeamMembers,
  type ProjectTeamMember
} from './project-team-members';
import { type UpdateProjectFormType } from './schema';
import { StudentCombobox } from './student-combobox';

export const ProjectForm = async ({
  projectId,
  defaultValues,
  members = []
}: {
  projectId?: string;
  defaultValues?: Partial<UpdateProjectFormType>;
  members?: ProjectTeamMember[];
}) => {
  const sessionUser = await getSessionUser();

  return (
    <ProjectFormProvider projectId={projectId} defaultValues={defaultValues}>
      <FieldGroup className="gap-6">
        <FieldGroup className="gap-6 sm:grid sm:grid-cols-2 sm:items-start">
          <FormInput name="name" label="Project name" />
          <FormInput
            name="github"
            label="GitHub repository"
            description="Optional when creating your project. You can add it later."
            placeholder="https://github.com/team/project"
          />
        </FieldGroup>

        <FormTextarea
          name="shortDescription"
          label="Short overview (2 sentences)"
          rows={3}
        />

        <section
          aria-label="Project team"
          className="min-w-0 rounded-lg bg-background p-5"
        >
          {projectId ? (
            <Field>
              <h2 className="text-xl">Team members ({members.length}/4)</h2>
              <p className="text-sm text-text-secondary">
                Team members cannot be changed. To choose a different team,
                cancel this project and create a new one.
              </p>
              <ProjectTeamMembers
                members={members}
                currentUserId={sessionUser.id}
              />
            </Field>
          ) : (
            <Suspense>
              <StudentCombobox
                options={await getProjectFormStudentComboboxOptionsQuery()}
                sessionUser={sessionUser}
              />
            </Suspense>
          )}
        </section>

        <FormEditor name="description" label="Project description" />
      </FieldGroup>
    </ProjectFormProvider>
  );
};
