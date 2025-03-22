'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/form';
import { Button } from '@/components/base/button';

import { projectFormSchema, type ProjectFormSchema } from './schema';
import { useSubmitProjectFormMutation } from './mutation';

export const ProjectFormProvider = ({
  children,
  defaultValues
}: PropsWithChildren<{
  defaultValues?: Partial<ProjectFormSchema>;
}>) => {
  const session = useSession();
  const router = useRouter();

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
    if (!session?.data?.user) {
      return;
    }

    // TODO: < 2
    if (data.students.length < 0) {
      toast.error('Please add at least two students.');

      return;
    }

    const [_result, error] = await mutation.mutateAsync({
      ...data,
      students: [...data.students, session.data.user.id]
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Project updated successfully.');

    // TODO(pv) - needed?
    router.replace('/project');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 flex items-center">
          <h1 className="grow text-3xl">Create a project</h1>
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
