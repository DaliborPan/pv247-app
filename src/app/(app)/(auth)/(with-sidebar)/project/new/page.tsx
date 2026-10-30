import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getMyProjectQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

const CreateProjectPage = async () => {
  const sessionUser = await getSessionUser();

  if (sessionUser.role !== 'student') redirect('/projects');
  if (await getMyProjectQuery()) redirect('/project');

  return <ProjectForm />;
};

export default function Page() {
  return (
    <Suspense fallback={<p role="status">Loading project form…</p>}>
      <CreateProjectPage />
    </Suspense>
  );
}
