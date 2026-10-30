import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Button } from '@/components/base/button/button';
import { OverviewCard } from '@/components/overview-card';
import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getMyProjectQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

const PageAsync = async () => {
  const sessionUser = await getSessionUser();
  if (sessionUser.role === 'lector') redirect('/lector/projects');

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
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-start gap-3">
        <Button href="/project" variant="link">
          Back to my project
        </Button>

        <h1 className="text-2xl sm:text-3xl">Edit your project</h1>
      </header>

      <OverviewCard className="p-5 sm:p-8">
        <ProjectForm
          projectId={project.id}
          defaultValues={defaultValues}
          members={project.users.map(user => ({
            id: user.id,
            name:
              [user.firstName, user.lastName].filter(Boolean).join(' ') ||
              user.name
          }))}
        />
      </OverviewCard>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <PageAsync />
  </Suspense>
);

export default Page;
