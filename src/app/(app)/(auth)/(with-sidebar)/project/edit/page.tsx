import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getMyProjectQuery } from '@/modules/project/queries';

const PageAsync = async () => {
  const project = await getMyProjectQuery();

  if (project?.assignment !== null) {
    redirect('/project');
  }

  const defaultValues = {
    name: project.name,
    shortDescription: project.shortDescription ?? '',
    description: project.description ?? '',
    github: project.github ?? ''
  };

  return (
    <ProjectForm
      projectId={project.id}
      defaultValues={defaultValues}
      members={project.users.map(
        user =>
          [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name
      )}
    />
  );
};

const Page = () => (
  <Suspense fallback={<p role="status">Loading project form…</p>}>
    <PageAsync />
  </Suspense>
);

export default Page;
