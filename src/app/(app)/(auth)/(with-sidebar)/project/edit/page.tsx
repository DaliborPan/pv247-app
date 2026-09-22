import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getMyProjectQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

const PageAsync = async () => {
  const sessionUser = await getSessionUser();
  const project = await getMyProjectQuery();

  if (!project) {
    redirect('/project');
  }

  const defaultValues = {
    id: project.id,
    name: project.name,
    shortDescription: project.shortDescription ?? '',
    description: project.description ?? '',
    github: project.github ?? '',
    students: project.users
      .filter(user => user.id !== sessionUser.id)
      .map(user => user.id)
  };

  return <ProjectForm defaultValues={defaultValues} />;
};

const Page = () => (
  <Suspense>
    <PageAsync />
  </Suspense>
);

export default Page;
