'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { FieldGroup } from '@/components/base/field/field';
import { Form } from '@/components/form/form';

import {
  useCreateProjectFormMutation,
  useUpdateProjectFormMutation
} from './mutation';
import {
  type CreateProjectFormType,
  createProjectSchema,
  updateProjectSchema,
  type UpdateProjectFormType
} from './schema';

export const ProjectFormProvider = ({
  projectId,
  children,
  defaultValues
}: PropsWithChildren<{
  projectId?: string;
  defaultValues?: Partial<UpdateProjectFormType>;
}>) => {
  const router = useRouter();

  const form = useForm<CreateProjectFormType | UpdateProjectFormType>({
    resolver: zodResolver(
      projectId ? updateProjectSchema : createProjectSchema
    ),
    defaultValues
  });

  const createMutation = useCreateProjectFormMutation();
  const updateMutation = useUpdateProjectFormMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (
    data: CreateProjectFormType | UpdateProjectFormType
  ) => {
    if (projectId) {
      await updateMutation.mutateAsync(data);
    } else {
      await createMutation.mutateAsync(data as CreateProjectFormType);
    }

    toast.success(projectId ? 'Project updated.' : 'Project created.');
    router.push('/project');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button href="/project" variant="link">
          Back to my project
        </Button>
        <div className="mb-6 flex items-center">
          <h1 className="grow text-3xl">
            {projectId ? 'Edit your project' : 'Create your own project'}
          </h1>

          <Button
            disabled={isPending}
            type="submit"
            iconLeft={{ icon: <Send data-icon="inline-start" /> }}
          >
            {isPending ? 'Saving…' : 'Save project'}
          </Button>
        </div>

        <fieldset disabled={isPending}>
          <FieldGroup>{children}</FieldGroup>
        </fieldset>
      </form>
    </Form>
  );
};
