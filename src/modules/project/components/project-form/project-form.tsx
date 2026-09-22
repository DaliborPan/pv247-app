import { Suspense } from 'react';

import { FormEditor } from '@/components/form/form-fields/form-editor';
import { FormInput } from '@/components/form/form-fields/form-input';
import { getProjectFormStudentComboboxOptionsQuery } from '@/modules/project/queries';

import { ProjectFormProvider } from './project-form-provider';
import { type ProjectFormSchema } from './schema';
import { StudentCombobox } from './student-combobox';

const ProjectFormStudentCombobox = async ({
  defaultValues
}: {
  defaultValues?: Partial<ProjectFormSchema>;
}) => {
  const options = await getProjectFormStudentComboboxOptionsQuery(
    defaultValues?.id
  );

  return <StudentCombobox options={options} />;
};

export const ProjectForm = ({
  defaultValues
}: {
  defaultValues?: Partial<ProjectFormSchema>;
}) => (
  <ProjectFormProvider defaultValues={defaultValues}>
    <FormInput name="name" label="Name" />
    <FormInput name="github" label="GitHub repository" />
    <FormInput
      name="shortDescription"
      label="GPT description (2 sentences overview)"
    />

    <div className="pt-1.5">
      <FormEditor name="description" label="Description" />
    </div>

    <div className="mt-2">
      <Suspense>
        <ProjectFormStudentCombobox defaultValues={defaultValues} />
      </Suspense>
    </div>
  </ProjectFormProvider>
);
