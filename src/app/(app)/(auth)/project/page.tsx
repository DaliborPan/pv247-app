import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getMyProjectQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

import { ProjectChoice } from './_components/project-choice';
import { ProjectDetail } from './_components/project-detail';

const ProjectPage = async () => {
  const sessionUser = await getSessionUser();
  if (sessionUser.role === 'lector') redirect('/lector/projects');

  const project = await getMyProjectQuery();

  return project ? <ProjectDetail project={project} /> : <ProjectChoice />;
};

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectPage />
    </Suspense>
  );
}
