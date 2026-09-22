'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSession } from '@/auth/client';
import { Button } from '@/components/base/button/button';
import { Form } from '@/components/form/form';

import { useSubmitProjectFormMutation } from './mutation';
import { projectFormSchema, type ProjectFormSchema } from './schema';

export const ProjectFormProvider = ({
  children,
  defaultValues
}: PropsWithChildren<{
  defaultValues?: Partial<ProjectFormSchema>;
}>) => {
  const { data: session } = useSession();

  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      students: []
    }
  });

  const mutation = useSubmitProjectFormMutation({
    isCreating: !defaultValues?.id
  });

  const onSubmit = async (data: ProjectFormSchema) => {
    if (!session?.user) {
      return;
    }

    // TODO: < 2
    if (data.students.length < 0) {
      toast.error('Please add at least two students.');

      return;
    }

    const [_result, error] = await mutation.mutateAsync({
      ...data,
      students: [...data.students, session.user.id]
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Project updated successfully.');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 flex items-center">
          <h1 className="grow text-3xl">
            {defaultValues ? 'Edit your project' : 'Create a project'}
          </h1>
          <Button
            isLoading={mutation.isPending}
            type="submit"
            iconLeft={{ icon: <Send /> }}
          >
            Submit
          </Button>
        </div>

        <div className="flex flex-col gap-y-4">{children}</div>
      </form>
    </Form>
  );
};
