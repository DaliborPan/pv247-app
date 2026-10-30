'use client';

import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { FieldGroup } from '@/components/base/field/field';
import { Prompt } from '@/components/base/prompt/prompt';
import { FormInput } from '@/components/form/form-fields/form-input';

import { type ProjectType } from '../../types';
import { updateProjectRepositoryAction } from './action';
import {
  updateProjectRepositoryFormSchema,
  type UpdateProjectRepositoryFormType
} from './schema';

export const UpdateProjectRepositoryAction = ({
  project
}: {
  project: ProjectType;
}) => (
  <Prompt<UpdateProjectRepositoryFormType>
    title={project.github ? 'Edit GitHub repository' : 'Add GitHub repository'}
    subtitle="Any member can update the repository. The assignment and team stay unchanged."
    formSchema={updateProjectRepositoryFormSchema}
    defaultValues={{ github: project.github ?? undefined }}
    content={
      <FieldGroup>
        <FormInput
          name="github"
          label="GitHub repository"
          placeholder="https://github.com/team/project"
        />
      </FieldGroup>
    }
    onDecision={async ({ confirmed, data }) => {
      if (!confirmed) return;

      const [, error] = await updateProjectRepositoryAction({
        github: data.github
      });

      if (error) throw new Error(error.message);

      toast.success('Repository saved.');
    }}
  >
    <Button type="button" size="sm" variant="outline/primary">
      {project.github ? 'Edit repository' : 'Add repository'}
    </Button>
  </Prompt>
);
