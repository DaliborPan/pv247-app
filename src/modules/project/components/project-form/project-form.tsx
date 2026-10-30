import { Suspense } from 'react';

import { FormEditor } from '@/components/form/form-fields/form-editor';
import { FormInput } from '@/components/form/form-fields/form-input';
import { getProjectFormStudentComboboxOptionsQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

import { ProjectFormProvider } from './project-form-provider';
import { type UpdateProjectFormType } from './schema';
import { StudentCombobox } from './student-combobox';

export const ProjectForm = async ({
  projectId,
  defaultValues,
  members
}: {
  projectId?: string;
  defaultValues?: Partial<UpdateProjectFormType>;
  members?: string[];
}) => {
  const sessionUser = await getSessionUser();

  return (
    <ProjectFormProvider projectId={projectId} defaultValues={defaultValues}>
      <FormInput name="name" label="Project name" />
      <FormInput
        name="github"
        label="GitHub repository"
        description="Optional when creating your project. You can add it later."
        placeholder="https://github.com/team/project"
      />

      <FormInput name="shortDescription" label="Short overview (2 sentences)" />
      <FormEditor name="description" label="Project description" />

      {projectId ? (
        <section aria-label="Team members" className="flex flex-col gap-2">
          <h2 className="text-xl">Team members</h2>
          <p>{members?.join(', ')}</p>
          <p className="text-sm text-text-secondary">
            Team members cannot be changed. To choose a different team, cancel
            this project and create a new one.
          </p>
        </section>
      ) : (
        <Suspense>
          <StudentCombobox
            options={await getProjectFormStudentComboboxOptionsQuery()}
            sessionUser={sessionUser}
          />
        </Suspense>
      )}
    </ProjectFormProvider>
  );
};
